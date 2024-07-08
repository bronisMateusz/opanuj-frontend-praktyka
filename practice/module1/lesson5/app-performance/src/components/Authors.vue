<script setup lang="ts">
import { Author } from '../types/Author';
import Placeholder from './Placeholder.vue';

defineProps({
  authors: {
    type: Array as () => Author[],
    required: true,
    default: <Author[]>[],
  },
});
</script>

<template>
  <div>
    <h2 class="font-bold text-xl mb-2">Authors</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
      <Placeholder v-if="!authors.length" :lines="8" :height="16" />
      <div
        v-else
        v-for="author in authors"
        :key="author.id"
        class="bg-blue-200 p-2 rounded-lg shadow"
      >
        <div class="flex flex-row items-center mb-2">
          <img
            :src="`https://randomuser.me/api/portraits/men/${author.id}.jpg`"
            class="w-4 h-4 mr-1 rounded-full"
          />
          <p>{{ author.name }}</p>
        </div>
        <p class="text-xs text-blue-600">
          Comments: {{ author.comments }}, Articles: {{ author.articles }}
        </p>
      </div>
    </div>
  </div>
</template>
