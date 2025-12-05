<script setup lang="ts">
import { ref } from "vue";
import { isJsonData, type JsonData } from "../types";

const jsonContent = ref<JsonData>();

function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target?.result as string) as unknown;
      if (!isJsonData(data)) throw new Error("Invalid JSON file");
      jsonContent.value = data;
    } catch (error) {
      alert(error);
    }
  };
  reader.readAsText(file);
}
</script>

<template>
  <div>
    <input type="file" @change="handleFileUpload" accept=".json" />
  </div>
</template>

<style scoped></style>
