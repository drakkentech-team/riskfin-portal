/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@mdi/font/css/materialdesignicons.css'
import '@styles/styles.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import VueDatepickerUi from 'vue-datepicker-ui'
import 'vue-datepicker-ui/lib/vuedatepickerui.css'
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

loadFonts()


// Create vue app
const app = createApp(App)
const pinia = createPinia()

// Use plugins
app.use(vuetify)
app.use(VCalendar, {})
app.use(pinia)
app.use(router)



// Mount vue app
app.mount('#app')
app.component('Datepicker', VueDatepickerUi)
