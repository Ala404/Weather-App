import './assets/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//import and export the apiKey from .env
export const apiKey = "wdKR5qjH0gGgfFl0rfhHUEVpgS5kstpplQx3B2PFcjc";
export const weatherApiKey = "7efa332cf48aeb9d2d391a51027f1a71";
// export const apiKey = import.meta.env.VITE_API_KEY;
// console.log(apiKey);

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
