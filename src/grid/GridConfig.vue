<script setup lang="ts">
import { computed, ref, watch, watchEffect } from "vue";

import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import type { GridData, GridParams } from "@/types";

const { grid_data, grid_params } = defineProps<{
  grid_data: GridData | null;
  grid_params: GridParams;
}>();

const date = ref<[Date, Date]>([
  new Date(grid_params.start_ts * 1000),
  new Date(grid_params.end_ts * 1000),
]);
watchEffect(() => {
  if (!date.value || date.value.length !== 2) return;
  grid_params.start_ts = date.value[0].getTime() / 1000;
  grid_params.end_ts = date.value[1].getTime() / 1000;
});

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
  <div>
    <VueDatePicker
      v-model="date"
      :range="{ partialRange: false }"
      :time-config="{ enableTimePicker: false }"
    ></VueDatePicker>
    <div v-if="is_multiple_choice">
      <label for="select">Select entry: </label>
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

<style scoped></style>
