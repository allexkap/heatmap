<script setup lang="ts">
import Cell from "./Cell.vue";
import type { CellConfig, GridData, GridParams } from "@/types";

import { computed } from "vue";

const { grid_data, grid_params } = defineProps<{
  grid_data: GridData | null;
  grid_params: GridParams;
}>();

const SECOND = 1000,
  MINUTE = SECOND * 60,
  HOUR = MINUTE * 60,
  DAY = HOUR * 24;

// todo
let grid_config = { gap: 4 };
const cell_config: CellConfig = {
  size: 40,
  radius: 20,
  colors: ["#333", "#0f0"],
  interpolation_method: "srgb",
};

function getDay(date: Date): number {
  return (date.getDay() + 6) % 7;
}

function getPosByDate(date: Date | number, start: Date): [number, number] {
  if (typeof date === "number") date *= SECOND;
  let pos =
    Math.floor((date.valueOf() - start.valueOf()) / DAY) + getDay(start);
  return [Math.floor(pos / 7), pos % 7];
}

function loadValues(
  grid_data: GridData | null,
  grid_params: GridParams
): number[][] {
  const [total_weeks, last_week_len] = getPosByDate(
    grid_params.end_ts,
    grid_params.start_ts
  );

  let new_values: Array<Array<number>>;

  if (grid_data !== null && grid_params.selected_entry) {
    new_values = Array.from({ length: 7 }, () =>
      Array.from({ length: total_weeks + 1 }, () => 0)
    );

    const start_ts = grid_params.start_ts.getTime() / SECOND;
    const end_ts = grid_params.end_ts.getTime() / SECOND;
    const data = grid_data.content[grid_params.selected_entry]!;

    for (const [key, value] of Object.entries(data)) {
      const ts = Number(key) + grid_params.offset_seconds;
      if (ts < start_ts || ts > end_ts) continue;
      const [x, y] = getPosByDate(ts, grid_params.start_ts);
      new_values[y]![x]! += value;
    }
  } else {
    new_values = Array.from({ length: 7 }, () =>
      Array.from({ length: total_weeks + 1 }, () => Math.random())
    );
  }

  for (let i = 0; i < getDay(grid_params.start_ts); ++i)
    new_values[i]![0]! = NaN;
  for (let i = last_week_len + 1; i < 7; ++i)
    new_values[i]![total_weeks]! = NaN;

  return new_values;
}

let values = computed(() => loadValues(grid_data, grid_params));
</script>

<template>
  <div class="wrapper">
    <div class="grid">
      <div class="grid-row header">
        <Cell
          v-for="i in (values[0]?.length ?? 0) + 1"
          class="cell"
          :config="cell_config"
        >
          <template v-if="i > 1">{{ i - 2 }}</template>
        </Cell>
      </div>
      <div v-for="(row, y) in values" class="grid-row">
        <Cell class="cell" :config="cell_config">{{ "MTWTFSS"[y] }}</Cell>
        <Cell
          class="cell"
          v-for="(value, x) in row"
          :value="value ?? NaN"
          :tooltip="`x=${x} y=${y}`"
          :config="cell_config"
        ></Cell>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  overflow-x: auto;
}

.grid {
  display: flex;
  flex-direction: column;
  min-width: max-content;
  gap: calc(v-bind("grid_config.gap") * 1px);
}

.grid-row {
  display: flex;
  gap: calc(v-bind("grid_config.gap") * 1px);
}

.control-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  transition-property: background-color;
  transition-duration: 1000ms;
}
</style>
