<script setup lang="ts">
import { defineAsyncComponent, provide, ref, watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import axios from 'axios';

import { Comment } from './types/Comment';

import Articles from './components/Articles.vue';
import Authors from './components/Authors.vue';
import Comments from './components/Comments.vue';

const fetchData = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

const { data: authorsData } = useQuery({
  queryKey: ['authors'],
  queryFn: () =>
    fetchData('http://localhost:3000/api/data/authors?timeout=5000').then(
      (data) => data.authors
    ),
});

const { isPending: isArticlesPending, data: articlesData } = useQuery({
  queryKey: ['articles'],
  queryFn: () =>
    fetchData('http://localhost:3000/api/data/articles?timeout=3000').then(
      (data) => data.articles
    ),
});

const { data: commentsData } = useQuery({
  queryKey: ['comments'],
  queryFn: () =>
    fetchData('http://localhost:3000/api/data/comments?timeout=2000').then(
      (data) => data.comments
    ),
});

const comments = ref<Comment[]>([]);
watch(commentsData, (newComments: Comment[] | undefined) => {
  if (newComments && Array.isArray(newComments)) {
    comments.value = newComments;
  }
});

provide('comments', comments);
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <div class="md:grid md:grid-cols-4 gap-x-8">
      <div class="col-span-1">
        <h1 class="text-3xl font-bold">Library</h1>
        <img
          class="rounded-xl shadow mb-2"
          src="./assets/image-v2.png"
          alt="Bookshelf"
        />
        <Comments />
      </div>
      <div class="col-span-3">
        <Authors :authors="authorsData" />
        <Articles :articles="articlesData" :authors="authorsData" />
      </div>
    </div>
  </div>
</template>
