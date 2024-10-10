import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuth: false,
    userId: 0,
    authToken: "",
    refreshToken: ""
  }),
  getters: {
    getUserId: (state) => state.userId,
    getAuthToken: (state) => state.authToken
  },
  actions: {
    login(tokens) {
      localStorage.setItem('auth-token', tokens.authToken)
      localStorage.setItem('refresh-token', tokens.refreshToken)
      localStorage.setItem('user-id', tokens.userId)
      this.isAuth = true
      this.userId = tokens.userId
      this.authToken = tokens.authToken
      this.refreshToken = tokens.refreshToken
    },
    async auth() {
      if (this.isAuth) return true

      const tokens = LoadTokens()
      if (tokens == null) {
        return false
      }

      if(await SendPingRequest(tokens.authToken) == false) {
        if ((await SendRefreshRequest(tokens.userId, tokens.authToken)) == false) {
            CleanLS()
            return false
          }
      }

      console.log(tokens.userId)
      this.isAuth = true
      this.userId = tokens.userId
      this.authToken = tokens.authToken
      this.refreshToken = tokens.refreshToken
      return true
    },
    logout() {
      this.isAuth = false
      this.userId = null
      this.authToken = null
      this.refreshToken = null
    }
  }
})

async function SendPingRequest(authToken) {
  const responce = await fetch('/api/ping', { headers: { Authorization: 'Bearer ' + authToken } })
  return responce.ok
}

async function SendRefreshRequest(userId, refreshToken) {
  const responce = await fetch('/api/auth/refresh?api-version=1.1', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ userId: userId, refreshToken: refreshToken })
  })
  return responce.ok ? await responce.json() : null
}

function LoadTokens() {
  var authToken = localStorage.getItem('auth-token')
  var refreshToken = localStorage.getItem('refresh-token')
  var userId = localStorage.getItem('user-id')

  if (authToken == null || refreshToken == null || userId == null) return null

  return { authToken: authToken, refreshToken: refreshToken, userId: Number(userId) }
}

function CleanLS() {
  localStorage.removeItem('auth-token')
  localStorage.removeItem('refresh-token')
  localStorage.removeItem('user-id')
}
