<script setup lang="ts">
import { ref } from "vue";

import { type GridConfigType } from "./GridConfig.vue";

import Cell from "./Cell.vue";
import Config from "./GridConfig.vue";

const { values } = defineProps<{
  values: number[][];
  grid_config: GridConfigType;
}>();
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
</style>
