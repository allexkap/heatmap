<script setup lang="ts">
import { type GridConfig } from "./types";

const { config } = defineProps<{
  config: GridConfig;
}>();
</script>

<template>
  <div class="config">
    Config Area:
    <div class="control-row">
      <input type="range" min="10" max="200" v-model="config.size" />
      {{ config.size }}
    </div>
    <div class="control-row">
      <input type="range" min="0" max="360" v-model="config.hue" />
      {{ config.hue }}
    </div>
    <div class="control-row">
      <input type="range" min="0" max="40" v-model="config.gap" />
      {{ config.gap }}
    </div>
    <div class="control-row">
      <input type="range" min="0" max="50" v-model="config.radius" />
      {{ config.radius }}
    </div>
  </div>
</template>

<style scoped></style>
