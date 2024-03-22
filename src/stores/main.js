import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { apiKey, weatherApiKey } from "../main";

let queryTimeout = ref(null);


export const useMainStore = defineStore("main", {
  state: () => ({
    mapboxSearchResults: null,
    searchError: null,
    weatherData: null,
    savedCities: [],
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
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=${weatherApiKey}&units=imperial`
    );
    this.weatherData = response.data;

    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = this.weatherData.current.dt * 1000 + localOffset;
    this.weatherData.currentTime =
      utc + 1000 * this.weatherData.timezone_offset;

    // cal hourly weather offset
    this.weatherData.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * this.weatherData.timezone_offset;
    });

    return this.weatherData;
  } catch (err) {
    console.log(err);
  }
  
},

 async getCities ()  {
  if (Array.isArray(this.savedCities)) {

    const requests = [];
    this.savedCities.forEach((city) => {
      requests.push(
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=${weatherApiKey}&units=imperial`
        )
      );
    });

    const weatherData = await Promise.all(requests);

    weatherData.forEach((value, index) => {
      this.savedCities[index].weather = value.data;
    });
  }
},

saveCity(city) {
  this.savedCities.push(city);
  
  },
  removeCity(id) {
    console.log('ID',id);
    this.savedCities = this.savedCities.filter((city) => city.id !== id);
    console.log('after',this.savedCities);
  },
  },
  persist: true,
});

