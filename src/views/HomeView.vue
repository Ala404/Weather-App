<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
        @input="mainStore.getSearchResults(searchQuery)"
      >
      <ul
        v-if="mainStore.mapboxSearchResults"
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
      >
        <p 
          v-if="mainStore.searchError"
          class="py-2"
        >
          Sorry, something went wrong, please try again.
        </p>
        <p
          v-if="!mainStore.searchError && mainStore.mapboxSearchResults.length === 0"
          class="py-2"
        >
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li
            
            v-for="searchResult in mainStore.mapboxSearchResults"
            :key="searchResult.id"
            class="py-2 cursor-pointer"
            @click="previewCity(searchResult)"
          >
            {{ searchResult.title }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const previewCity = (searchResult) => {
  const [city, state] = searchResult.title.split(",");
  router.push({
    name: "cityView",
    params: { state: state.trim(), city: city.trim() },
    query: {
      lat: searchResult.position.lat,
      lng: searchResult.position.lng,
      preview: true,
    },
  });
};
import { useMainStore } from "../stores/main";

const mainStore = useMainStore();
const searchQuery = ref("");
</script>
