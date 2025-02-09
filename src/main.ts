import { createApp } from 'vue'
import router from '@/routes/index'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')