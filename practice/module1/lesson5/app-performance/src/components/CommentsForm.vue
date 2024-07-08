<script setup lang="ts">
import { inject, ref, Ref } from 'vue';
import axios from 'axios';
import { useMutation } from '@tanstack/vue-query';
import { Comment } from '../types/Comment';

const comments = inject('comments') as Ref<Comment[]>;

const { mutate } = useMutation({
  mutationFn: async (newComment) => {
    const response = await axios.post(
      'http://localhost:3000/api/data/comments?timeout=2000',
      newComment
    );
    return response.data;
  },
  onMutate: async (newComment: Comment) => {
    // Optimistically update the UI before the request completes
    const optimisticComment: Comment = newComment;
    comments.value = [...comments.value, optimisticComment];

    // Return context with the optimistic comment
    return { optimisticComment };
  },
  onError: (_error, _newComment, context) => {
    // If the mutation fails, roll back the optimistic update
    if (context && context.optimisticComment) {
      comments.value = comments.value.filter(
        (comment) => comment.id !== context.optimisticComment.id
      );
    }
  },
});

const newComment = ref('');
const newRating = ref(5);

const storeNewComment = () => {
  mutate({
    id: comments.value.length + 1,
    text: newComment.value,
    author: 'John Doe',
    rating: newRating.value,
  });

  newComment.value = '';
  newRating.value = 5;
};
</script>

<template v-if="comments.length > 0">
  <form @submit.prevent="storeNewComment">
    <div class="flex flex-col">
      <input
        v-model="newComment"
        type="text"
        placeholder="Write a comment..."
        class="w-full p-2 rounded-lg mb-2"
      />
      <input
        min="1"
        max="5"
        v-model.number="newRating"
        type="number"
        placeholder="Rating"
        class="w-full p-2 w-12 rounded-lg"
      />
    </div>
    <button class="bg-violet-400 text-white p-2 rounded-lg mt-2">Submit</button>
  </form>
</template>
