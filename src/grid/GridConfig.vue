<script setup lang="ts">
import { computed, ref, watch, watchEffect } from "vue";

import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import type { GridData, GridParams } from "@/types";

const { grid_data, grid_params } = defineProps<{
  grid_data: GridData | null;
  grid_params: GridParams;
}>();

let is_multiple_choice = computed(() => {
  return grid_data !== null && Object.keys(grid_data.content).length > 1;
});

let selected_entry_id = ref(0);
watchEffect(() => {
  if (!grid_data) return;
  const entry = Object.keys(grid_data.content)[selected_entry_id.value];
  grid_params.selected_entry = entry ?? null;
});
</script>

<template>
  <div class="config">
    <div>
      <div>Select date range:</div>
      <VueDatePicker
        :model-value="[grid_params.start_ts, grid_params.end_ts]"
        @update:model-value="
          ([start, end]) => {
            grid_params.start_ts = start;
            grid_params.end_ts = end;
          }
        "
        :range="{ partialRange: false }"
        :time-config="{ enableTimePicker: false }"
      ></VueDatePicker>
    </div>
    <div v-if="is_multiple_choice">
      <div>Select entry:</div>
      <select id="select" v-model="selected_entry_id">
        <option
          v-for="(entry, i) in Object.keys(grid_data!.content)"
          :value="i"
        >
          {{ entry }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.config {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
</style>
