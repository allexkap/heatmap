<script setup lang="ts">
import Grid from "./Grid.vue";

let values = generateRandomArray(7, 40);

function generateRandomArray(rows: number, cols: number): number[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.random())
  );
}
</script>

<template>
  <Grid :values></Grid>
</template>

<style scoped>
:global(body) {
  background-color: #1f1f1f;
  color: #ffffff;
  font-family: sans-serif;
}
</style>
