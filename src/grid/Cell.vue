<script setup lang="ts">
import type { CellConfig, CellValue } from "@/types";

const { value, tooltip, config } = defineProps<{
  value: CellValue;
  tooltip: string;
  config: CellConfig;
}>();

function getColor() {
  if (Number.isNaN(value) || value == "disabled") return "transparent";

  if (value == "future") return "red";

  return `color-mix(
    in ${config.interpolation_method},
    ${config.colors[0]} ${100 * (1 - value)}%,
    ${config.colors[1]} ${100 * value}%
  )`;
}
</script>

<template>
  <div
    class="cell"
    :title="tooltip"
    :style="{
      width: config.size + 'px',
      height: config.size + 'px',
      borderRadius: config.radius + '%',
      backgroundColor: getColor(),
    }"
  ></div>
</template>

<style scoped></style>
