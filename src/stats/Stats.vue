<script setup lang="ts">
import type { GridData, GridParams } from "@/types";

const { grid_data, grid_params } = defineProps<{
  grid_data: GridData | null;
  grid_params: GridParams;
}>();
</script>

<template>
  <div>
    <p>
      Total range:
      {{ (grid_params.end_ts - grid_params.start_ts) / 60 / 60 / 24 }} day(s)
    </p>
    <div>
      Debug:
      <details>
        <summary>Params</summary>
        <pre>{{ JSON.stringify(grid_params, null, 2) }}</pre>
      </details>
      <details v-if="grid_data">
        <summary>Data</summary>
        <pre>{{ JSON.stringify(grid_data, null, 2) }}</pre>
      </details>
    </div>
  </div>
</template>

<style scoped></style>
