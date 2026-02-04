import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@/style.css'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia();

pinia.use(createPersistedState())

app.use(pinia)

app.mount('#app')
