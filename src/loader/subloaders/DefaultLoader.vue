<script setup lang="ts">
import { isGridData, type GridData } from "@/types";
import { ref } from "vue";

const emit = defineEmits<{
  (e: "update:grid_data", id: GridData): void;
}>();

let uploaded_file = ref<GridData | null>(null);

async function handleFileUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  let ok = false;
  try {
    if (file) {
      const text = await file.text();
      const obj = JSON.parse(text);
      if (isGridData(obj)) {
        uploaded_file.value = obj;
        ok = true;
      }
    }
  } finally {
    if (!ok) {
      uploaded_file.value = null;
      alert("Incorrect json");
    }
  }
}
</script>

<template>
  <div>
    <div>Select file:</div>
    <input type="file" accept=".json" @change="handleFileUpload" />
  </div>

  <input
    type="button"
    value="Process"
    class="process"
    :disabled="uploaded_file === null"
    @click="if (uploaded_file) emit('update:grid_data', uploaded_file);"
  />
</template>

<style scoped>
.process {
  margin-left: auto;
}
</style>
