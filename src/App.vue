<script setup lang="ts">
import { ref } from "vue";

import { type GridData, type GridParams } from "./types";

import Grid from "./grid/Grid.vue";
import Loader from "./loader/Loader.vue";
import Stats from "./stats/Stats.vue";
import GridConfig from "./grid/GridConfig.vue";

let grid_data = ref<GridData>();
let grid_params = ref<GridParams>({ start_ts: 0, end_ts: 0, offset: 0 });
</script>

<template>
  <div class="app">
    <div class="row">
      <Loader @update:grid_data="grid_data = $event" class="area"></Loader>
      <GridConfig :params="grid_params" class="area"></GridConfig>
    </div>
    <Grid class="area" :grid_data :grid_params></Grid>
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
