<script setup lang="ts">
import { inject } from 'vue';
import { Comment } from '../types/Comment';

import CommentsForm from './CommentsForm.vue';
import Placeholder from './Placeholder.vue';

const comments = inject('comments') as Comment[];
</script>

<template>
  <h2 class="font-bold text-xl my-2">Comments</h2>
  <div class="grid gap-2">
    <Placeholder v-if="!comments.length" :lines="5" :height="16" />
    <div
      v-else
      v-for="comment in comments"
      :key="comment.id"
      class="bg-violet-400 rounded-xl text-white p-4 shadow"
    >
      <p class="italic">{{ comment.text }}</p>
      <p class="text-sm text-violet-900">
        {{ comment.author }} - Rating {{ comment.rating }}/5
      </p>
    </div>
    <CommentsForm />
  </div>
</template>
