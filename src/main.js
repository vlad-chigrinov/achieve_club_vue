import '../assets/styles/app.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { createWebHistory, createRouter } from 'vue-router'
import HomePage from './Pages/HomePage.vue'
import LoginPage from './Pages/LoginPage.vue'
import RegistrationPage from './Pages/RegistrationPage.vue'
import TopUsersPage from './Pages/TopUsersPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/registration', component: RegistrationPage },
  { path: '/topusers', component: TopUsersPage },
]

const pinia = createPinia()

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(pinia).use(router).mount('#app')
