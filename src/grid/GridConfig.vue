<script setup lang="ts">
import { ref, watch } from "vue";

import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import type { GridParams } from "@/types";

defineProps<{
  params: GridParams;
}>();

const date = ref();
</script>

<template>
  <div>
    <VueDatePicker
      v-model="date"
      :range="{ partialRange: false }"
    ></VueDatePicker>
    {{ date }}
  </div>
</template>

<style scoped></style>
