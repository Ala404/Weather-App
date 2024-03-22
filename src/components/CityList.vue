<template>
  <div v-for="city in mainStore.savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
    
  </div>

  <p v-if="mainStore.savedCities.length === 0">
    No locations added. To start tracking a location, search in
    the field above.
  </p>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import CityCard from "./CityCard.vue";
import {useMainStore} from "../stores/main";

const mainStore = useMainStore();
onBeforeMount(async () => {
   await mainStore.getCities();
   console.log("from city list:",mainStore.savedCities);
});

const router = useRouter();
const goToCityView = (city) => {
  console.log("city", city);
  router.push({
    name: "cityView",
    params: { state: city.state, city: city.city },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lng: city.coords.lng,
    },
  });
};
</script>