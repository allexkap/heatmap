<script setup lang="ts">
import { ref } from 'vue';
import Cell from './Cell.vue';

let size = ref(40);
let values = generateRandomArray(7, 40);

function generateRandomArray(rows: number, cols: number): number[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.random())
  )
}
</script>

<template>
  <input type="range" min="10" max="200" v-model="size">
  <div class="wrapper">
    <div class="grid">
      <div v-for="(row, y) in values" class="row">
        <Cell v-for="(saturation, x) in row" :saturation :size :date="`x=${x} y=${y}`"></Cell>
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
  gap: 4px;
  min-width: max-content;
}

.row {
  display: flex;
  gap: 4px;
}
</style>
