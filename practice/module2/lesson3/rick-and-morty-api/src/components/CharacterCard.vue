<script lang="ts" setup>
import type { Character } from '../api/api-client-generated/models/Character';
defineProps<{
  character: Character;
}>();
const URL = 'https://rickandmortyapi.com/api/episode/';
</script>
<template>
  <section class="character-card">
    <h3>{{ character.name }}</h3>
    <img
      :src="character.image"
      :alt="`Image of ${character.name}`"
      class="character-image"
      width="300"
      height="300"
    />
    <p><strong>Status:</strong> {{ character.status }}</p>
    <p><strong>Species:</strong> {{ character.species }}</p>
    <p><strong>Type:</strong> {{ character.type }}</p>
    <p><strong>Gender:</strong> {{ character.gender }}</p>
    <p><strong>Origin:</strong> {{ character.origin?.name }}</p>
    <p><strong>Location:</strong> {{ character.location?.name }}</p>
    <div class="episodes">
      <h4>Episodes:</h4>
      <ol>
        <li v-for="(episode, index) in character.episode || []" :key="index">
          {{ episode.replace(URL, '')
          }}<span v-if="index < (character.episode?.length || 0) - 1">, </span>
        </li>
      </ol>
    </div>
    <p><strong>Created:</strong> {{ character.created?.toLocaleString() }}</p>
  </section>
</template>
<style scoped>
.character-card {
  display: grid;
  gap: 8px;
}

img {
  margin-inline: auto;
}

.character-image {
  border-radius: 8px;
}

h4,
p {
  margin: 0;
}

ol {
  display: flex;
  flex-wrap: wrap;
}
</style>
