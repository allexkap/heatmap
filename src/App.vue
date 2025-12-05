<script setup lang="ts">
import { ref } from "vue";

import Grid from "./grid/Grid.vue";
import Loader from "./loader/Loader.vue";

import Config from "./config/Config.vue";
import Stats from "./stats/Stats.vue";

let values = generateRandomArray(7, 40);

function generateRandomArray(rows: number, cols: number): number[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.random())
  );
}
</script>

<template>
  <div class="app">
    <div class="row">
      <Loader class="area"></Loader>
      <Config class="area"></Config>
    </div>
    <Grid class="area" :values></Grid>
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
