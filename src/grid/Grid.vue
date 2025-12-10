<script setup lang="ts">
import Cell from "./Cell.vue";
import type { GridData, GridParams } from "@/types";

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
const grid_config = ref({
  hue: 120,
  gap: 4,
  size: 40,
  radius: 20,
});

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
          v-for="(saturation, x) in row"
          :date="`x=${x} y=${y}`"
          :saturation
          :hue="grid_config.hue"
          :size="grid_config.size"
          :radius="grid_config.radius"
          class="cell"
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
