<script setup lang="ts">
import type { CharacterListResponse } from '../api/models/CharacterListResponse';
import CharacterCard from './CharacterCard.vue';

defineProps<{
  characters: CharacterListResponse | null;
}>();
</script>

<template>
  <ol v-if="characters">
    <li v-for="character in characters.results" :key="character.id">
      <CharacterCard :character="character" />
    </li>
  </ol>
  <p v-else>Loading...</p>
</template>

<style scoped>
ol {
  display: grid;
  gap: 32px 16px;
  padding-block: 48px 64px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
