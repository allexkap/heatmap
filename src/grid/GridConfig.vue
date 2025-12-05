<script lang="ts">
export interface GridConfigType {
  hue: number;
  gap: number;
  size: number;
  radius: number;
}

export function createGridConfig(
  config?: Partial<GridConfigType>
): GridConfigType {
  return {
    hue: 120,
    gap: 4,
    size: 40,
    radius: 20,
    ...config,
  };
}
</script>

<script setup lang="ts">
const { config } = defineProps<{
  config: GridConfigType;
}>();
</script>

<template>
  <div class>
    <div>
      <input type="range" min="10" max="200" v-model="config.size" />
      {{ config.size }}
    </div>
    <div>
      <input type="range" min="0" max="360" v-model="config.hue" />
      {{ config.hue }}
    </div>
    <div>
      <input type="range" min="0" max="40" v-model="config.gap" />
      {{ config.gap }}
    </div>
    <div>
      <input type="range" min="0" max="50" v-model="config.radius" />
      {{ config.radius }}
    </div>
  </div>
</template>

<style scoped></style>
