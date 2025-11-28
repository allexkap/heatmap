<script setup lang="ts">
const { date, saturation, hue = 120, size = 10, radius = 20 } = defineProps<{
    date: string,
    saturation: number,
    hue?: number
    size?: number,
    radius?: number
}>()

function getColor() {
    return `hsl(${hue}, ${saturation * 100}%, 50%)`;
}
</script>

<template>
    <div :style="{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: getColor(),
        borderRadius: `${radius}%`,
    }" :title=date></div>
</template>

<style scoped></style>
