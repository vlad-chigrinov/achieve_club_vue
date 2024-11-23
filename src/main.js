import '../assets/styles/app.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { createWebHistory, createRouter } from 'vue-router'
import HomePage from './Pages/HomePage.vue'
import LoginPage from './Pages/LoginPage.vue'
import RegistrationPage from './Pages/RegistrationPage.vue'
import TopUsersPage from './Pages/TopUsersPage.vue'
import InfoPage from './Pages/InfoPage.vue'
import AnotherUserPage from './Pages/AnotherUserPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/registration', component: RegistrationPage },
  { path: '/topusers', component: TopUsersPage },
  { path: '/info', component: InfoPage },
  { path: '/users/:id', component: AnotherUserPage }
]

const pinia = createPinia()

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(pinia).use(router).mount('#app')
