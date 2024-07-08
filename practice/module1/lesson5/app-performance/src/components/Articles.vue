<script setup lang="ts">
import { Article } from '../types/Article';
import { Author } from '../types/Author';

import Placeholder from './Placeholder.vue';

defineProps({
  articles: {
    type: Array as () => Article[],
    required: true,
    default: <Article[]>[],
  },
  authors: {
    type: Array as () => Author[],
    required: false,
  }
});
</script>

<template>
  <h2 class="font-bold text-xl mt-2">Articles</h2>
  <div class="grid gap-2">
    <Placeholder v-if="!articles.length" :lines="5" :height="24" />
    <div
      v-else
      v-for="article in articles"
      :key="article.id"
      class="bg-white p-2 rounded-lg shadow text-gray-800"
    >
      <h2 class="font-bold">{{ article.title }}</h2>
      <p>{{ article.content }}</p>
      <div class="flex flex-row items-center mb-2">
        <img
          :src="`https://randomuser.me/api/portraits/women/${article.id}.jpg`"
          class="w-4 h-4 mr-1 rounded-full"
        />
        <p>{{ article.author }}</p>
      </div>
    </div>
  </div>
  <p v-if="authors" class="text-right mt-4">
    Created by {{ authors.length }} authors
  </p>
</template>
