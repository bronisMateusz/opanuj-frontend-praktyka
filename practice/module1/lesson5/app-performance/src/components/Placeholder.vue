<script setup lang="ts">
defineProps({
  lines: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div
    v-for="line in lines"
    :key="line"
    :class="`animate-pulse h-${height} bg-gray-300 rounded-lg`"
  ></div>
</template>
