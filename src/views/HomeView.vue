<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="mainStore.getSearchResults(searchQuery)"
        placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
   
      <ul
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
        v-if="mainStore.mapboxSearchResults"
      >
        <li
          v-for="searchResult in mainStore.mapboxSearchResults"
          :key="searchResult.id"
          class="py-2 cursor-pointer"
          @click="previewCity(searchResult)"
        >
          {{ searchResult.title }}
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";

import { useMainStore } from '../stores/main';

const mainStore = useMainStore();
const searchQuery = ref("");


</script>
