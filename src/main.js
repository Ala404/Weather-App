import './assets/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//import and export the apiKey from .env
export const apiKey = "wdKR5qjH0gGgfFl0rfhHUEVpgS5kstpplQx3B2PFcjc";
export const weatherApiKey = "ea232c44f44fe3a769c49c0ff9598e9e";
// export const apiKey = import.meta.env.VITE_API_KEY;
// console.log(apiKey);

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
