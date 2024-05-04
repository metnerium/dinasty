/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import metrika from "@/metrika.vue";
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import store from '@/store' // Update the import path if needed

const app = createApp(App)

registerPlugins(app)
app.use(store) // Use the store
app.component('metrika', metrika)
app.mount('#app')
