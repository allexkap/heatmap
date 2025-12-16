<script setup lang="ts">
import { ref } from "vue";

import { type GridData, type GridParams } from "./types";

import Grid from "./grid/Grid.vue";
import Loader from "./loader/Loader.vue";
import Stats from "./stats/Stats.vue";
import GridConfig from "./grid/GridConfig.vue";
import AppConfig from "./config/AppConfig.vue";

function getYearRange(): [Date, Date] {
  let now = new Date();
  now.setHours(0, 0, 0, 0);
  let year_ago = new Date(now);
  year_ago.setFullYear(now.getFullYear() - 1);
  year_ago.setDate(year_ago.getDate() + 1);
  return [year_ago, now];
}

let [start_ts, end_ts] = getYearRange();

let grid_data = ref<GridData | null>(null);
let grid_params = ref<GridParams>({
  start_ts: start_ts,
  end_ts: end_ts,
  offset_seconds: 0,
  selected_entry: null,
});
</script>

<template>
  <div class="app">
    <div class="row">
      <div class="area">
        <p class="header">Loader</p>
        <Loader @update:grid_data="grid_data = $event"></Loader>
      </div>
      <div class="area">
        <p class="header">View Config</p>
        <GridConfig :grid_data :grid_params></GridConfig>
      </div>
    </div>
    <Grid class="area" :grid_data :grid_params></Grid>
    <div class="row">
      <div class="area">
        <p class="header">Stats</p>
        <Stats :grid_data :grid_params></Stats>
      </div>
      <div class="area">
        <p class="header">App Config</p>
        <AppConfig></AppConfig>
      </div>
    </div>
  </div>
</template>

<style scoped>
:global(body) {
  background-color: #222;
  color: #fff;
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

.header {
  text-align: center;
  font-weight: bolder;
  font-size: large;
  margin-top: -0.4em;
  padding-bottom: 0.4em;
  margin-bottom: 0.4em;
  border-bottom: 1px solid #aaa;
}
</style>
