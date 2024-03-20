import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { apiKey, weatherApiKey } from "../main";
// console.log(apiKey);
let queryTimeout = ref(null);

export const useMainStore = defineStore("main", {
  state: () => ({
    mapboxSearchResults: null,
  }),
  actions: {
    async getSearchResults(searchQuery) {
      clearTimeout(queryTimeout.value);
      queryTimeout.value = setTimeout(async () => {
        if (searchQuery !== "") {
          try {
            const result = await axios.get(
              `https://geocode.search.hereapi.com/v1/geocode?q=${searchQuery}&apiKey=${apiKey}`
            );
            this.mapboxSearchResults = result.data.items;
          } catch (error) {
            console.error(error);
          }
        } else {
          this.mapboxSearchResults = null;
        }
      }, 300);
    },
  },
});
