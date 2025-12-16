<script setup lang="ts">
import { computed, ref } from "vue";

import { loadersRegistry } from "./subloaders";
import type { GridData } from "@/types";

const emit = defineEmits<{
  (e: "update:grid_data", id: GridData): void;
}>();

const loaders = loadersRegistry;
let selectedLoaderIndex = ref(0);
let selectedLoader = computed(() => loaders[selectedLoaderIndex.value]);
</script>

<template>
  <div>
    <div class="selector">
      <label for="select">Select loader: </label>
      <select id="select" v-model="selectedLoaderIndex">
        <option v-for="(loader, i) in loaders" :value="i">
          {{ loader.displayName }}
        </option>
      </select>
    </div>
    <div v-if="selectedLoader" class="container">
      <component
        :is="selectedLoader.component"
        @update:grid_data="$emit('update:grid_data', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 1em;
  display: flex;
  gap: 0.5em;
  flex-direction: column;
}
</style>
