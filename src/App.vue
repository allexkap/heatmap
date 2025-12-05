<script setup lang="ts">
import { ref } from "vue";

import { createGridConfig } from "./grid/GridConfig.vue";

import Grid from "./grid/Grid.vue";
import Loader from "./loader/Loader.vue";
import Config from "./config/Config.vue";
import Stats from "./stats/Stats.vue";
import GridConfig from "./grid/GridConfig.vue";

let values = generateRandomArray(7, 40);

function generateRandomArray(rows: number, cols: number): number[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.random())
  );
}

let grid_config = ref(createGridConfig());
</script>

<template>
  <div class="app">
    <div class="row">
      <Loader class="area"></Loader>
      <Config class="area"></Config>
      <GridConfig :config="grid_config" class="area"></GridConfig>
    </div>
    <Grid class="area" :values :grid_config></Grid>
    <Stats class="area"></Stats>
  </div>
</template>

<style scoped>
:global(body) {
  background-color: #1f1f1f;
  color: #ffffff;
  font-family: sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1rem;
}

.row {
  display: flex;
  gap: inherit;
}

.area {
  padding: 1em;
  border: 2px solid #aaa;
  border-radius: 10px;
  max-width: fit-content;
}
</style>
