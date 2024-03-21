import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { apiKey, weatherApiKey } from "../main";
// console.log(apiKey);
let queryTimeout = ref(null);

export const useMainStore = defineStore("main", {
  state: () => ({
    mapboxSearchResults: null,
    searchError: null,
    weatherData: null,
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
            console.log(this.mapboxSearchResults);
          } catch (error) {
            this.searchError = true;
            console.error(error);
          }
        } else {
          this.mapboxSearchResults = null;
        }
      }, 300);
    },
    ///weather api
      async getWeatherData (route) {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lng}&appid=${weatherApiKey}`
    );

    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;

    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime =
        utc + 1000 * weatherData.data.timezone_offset;
    });

    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
  
}
  },
});

