<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchCharacters } from './utils/fetchCharacters';
import type { CharacterListResponse } from './api/api-client-generated/models/CharacterListResponse';
import CharacterList from './components/CharacterList.vue';

const characters = ref<CharacterListResponse | null>(null);

onMounted(async () => (characters.value = await fetchCharacters()));
</script>

<template>
  <div id="app">
    <h1>List of Rick and Morty characters</h1>
    <CharacterList :characters="characters" />
  </div>
</template>
