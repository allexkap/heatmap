<script setup lang="ts">
import { ref } from "vue";

import { type GridData, type GridParams } from "./types";

import Grid from "./grid/Grid.vue";
import Loader from "./loader/Loader.vue";
import Stats from "./stats/Stats.vue";
import GridConfig from "./grid/GridConfig.vue";

function getYearRange(): [number, number] {
  let now = new Date();
  let year_ago = new Date(now);
  year_ago.setFullYear(now.getFullYear() - 1);
  return [year_ago.getTime() / 1000, now.getTime() / 1000];
}

let [start_ts, end_ts] = getYearRange();

let grid_data = ref<GridData | null>(null);
let grid_params = ref<GridParams>({
  start_ts: start_ts,
  end_ts: end_ts,
  offset: 0,
  selected_entry: null,
});
</script>

<template>
  <div class="app">
    <div class="row">
      <Loader @update:grid_data="grid_data = $event" class="area"></Loader>
      <GridConfig :grid_data :grid_params class="area"></GridConfig>
    </div>
    <Grid class="area" :grid_data :grid_params></Grid>
    <Stats class="area" :grid_data :grid_params></Stats>
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
