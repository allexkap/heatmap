<script setup lang="ts">
import { ref } from "vue";

import Grid from "./Grid.vue";
import Loader from "./Loader.vue";

import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

let values = generateRandomArray(7, 40);

function generateRandomArray(rows: number, cols: number): number[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.random())
  );
}

const date = ref();
</script>

<template>
  <VueDatePicker
    v-model="date"
    :range="{ partialRange: false }"
  ></VueDatePicker>
  {{ date }}
  <Loader></Loader>
  <Grid :values></Grid>
</template>

<style scoped>
:global(body) {
  background-color: #1f1f1f;
  color: #ffffff;
  font-family: sans-serif;
}
</style>
