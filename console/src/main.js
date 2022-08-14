import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import { createVuetify } from "vuetify"

import App from "./components/App.vue"
import Unit from "./components/Unit.vue"
import Group from "./components/Group.vue"
import Record from "./components/Record.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/unit/:id?", component: Unit, props: true },
    { path: "/group/:id?", component: Group, props: true },
    { path: "/record", component: Record }
  ]
})

const app = createApp(App)
app.use(router)
app.use(createVuetify())
app.mount("#app")
