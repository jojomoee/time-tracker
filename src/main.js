
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./index.css"
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(createPinia())
app.use(Vue3Toastify, {
  autoClose: 3000, // Toast will close after 3 seconds
  position: "top-right",
});


app.use(router)

app.mount('#app')
