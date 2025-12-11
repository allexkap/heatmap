<script setup lang="ts">
import Cell from "./Cell.vue";
import type { CellConfig, GridData, GridParams } from "@/types";

import { ref } from "vue";

const { grid_data } = defineProps<{
  grid_data: GridData | null;
  grid_params: GridParams;
}>();

function generateRandomArray(rows: number, cols: number): number[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.random())
  );
}

let values = ref(generateRandomArray(7, 40));

// todo
let grid_config = { gap: 4 };
const cell_config: CellConfig = {
  size: 40,
  radius: 20,
  colors: ["#333", "#0f0"],
  interpolation_method: "srgb",
};

let demo: number | null = null;
demo = setInterval(() => {
  if (grid_data) {
    if (demo) clearInterval(demo);
    demo = null;
  } else {
    values.value = generateRandomArray(7, 40);
  }
}, 500);
</script>

<template>
  <div class="wrapper">
    <div class="grid" :style="{ gap: `${grid_config.gap}px` }">
      <div
        v-for="(row, y) in values"
        class="grid-row"
        :style="{ gap: `${grid_config.gap}px` }"
      >
        <Cell
          class="cell"
          v-for="(value, x) in row"
          :tooltip="`x=${x} y=${y}`"
          :value
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
}

.grid-row {
  display: flex;
}

.control-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.cell {
  transition-property: background-color;
  transition-duration: 1000ms;
}
</style>
