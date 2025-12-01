<script setup lang="ts">
import { ref } from "vue";
import Cell from "./Cell.vue";
import { type GridConfig } from "./types";
import Config from "./Config.vue";

const { values } = defineProps<{
  values: number[][];
}>();

let grid_config = ref<GridConfig>({
  hue: 120,
  gap: 4,
  size: 40,
  radius: 20,
});
</script>

<template>
  <Config v-model:config="grid_config"></Config>
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
