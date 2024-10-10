import './assets/styles/app.css'

import { createApp } from 'vue'
import App from './App.vue'

import { createWebHistory, createRouter } from 'vue-router'
import HomePage from './Pages/HomePage.vue'
import LoginPage from './Pages/LoginPage.vue'
import RegistrationPage from './Pages/RegistrationPage.vue'
import TopUsers from './Pages/TopUsersPage.vue'
import TopClubs from './Pages/TopClubsPage.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
    async beforeEnter() {
      if (tryLoadTokens()) {
        if (await tryAuth()) return true
      }
      return '/login'
    }
  },
  { path: '/login', component: LoginPage },
  { path: '/registration', component: RegistrationPage },
  { path: '/topusers', component: TopUsers },
  { path: '/topclubs', component: TopClubs }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')

async function tryAuth() {
  var responce = await fetch('http://achieve.by:5000/ping')
  return responce.ok
}

function tryLoadTokens() {
  var accessToken = localStorage.getItem('access-token')
  var refreshToken = localStorage.getItem('refresh-token')

  if (accessToken == null || refreshToken == null) return false

  document.cookie = 'X-Access-Token=' + accessToken + ';X-Refresh-Token=' + refreshToken + ';'
  return true
}
