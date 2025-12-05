<script setup lang="ts">
import { computed, ref } from "vue";
import { loadersRegistry } from "./subloaders";

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
      <component :is="selectedLoader.component" />
    </div>
  </div>
</template>

<style scoped></style>
