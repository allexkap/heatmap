<script setup lang="ts">
import { isGridData, type GridData } from "@/types";

const emit = defineEmits<{
  (e: "update:grid_data", id: GridData): void;
}>();

async function handleFileUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  let ok = false;
  try {
    if (file) {
      const text = await file.text();
      const obj = JSON.parse(text);
      if (isGridData(obj)) {
        emit("update:grid_data", obj);
        ok = true;
      }
    }
  } finally {
    if (!ok) alert("Incorrect json");
  }
}
</script>

<template>
  <input type="file" accept=".json" @change="handleFileUpload" />
</template>

<style scoped></style>
