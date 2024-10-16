import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuth: false,
    userId: 0,
    authToken: '',
    refreshToken: ''
  }),
  getters: {
    getUserId: (state) => state.userId,
    getAuthToken: (state) => state.authToken
  },
  actions: {
    login(tokens) {
      SaveUserData(tokens)
      this.isAuth = true
      this.userId = tokens.userId
      this.authToken = tokens.authToken
      this.refreshToken = tokens.refreshToken
    },
    async tryAuth() {
      if (this.isAuth == false) {
        const userData = LoadUserData()
        if (userData == null) {
          return false
        }
        this.isAuth = true
        this.userId = userData.userId
        this.authToken = userData.authToken
        this.refreshToken = userData.refreshToken
      }

      if ((await SendPingRequest(this.authToken)) == false) {
        const newUserData = await SendRefreshRequest(this.userId, this.refreshToken)

        if (newUserData == null) {
          CleanUserData()
          return false
        }

        this.userId = newUserData.userId
        this.authToken = newUserData.authToken
        this.refreshToken = newUserData.refreshToken
        SaveUserData(newUserData)
      }

      return true
    },
    logout() {
      CleanUserData()
      this.isAuth = false
      this.userId = null
      this.authToken = null
      this.refreshToken = null
    }
  }
})

async function SendPingRequest(authToken) {
  console.log('send ping request')
  const responce = await fetch('http://achieve.by:5000/api/ping', {
    headers: { Authorization: 'Bearer ' + authToken }
  })
  return responce.ok
}

async function SendRefreshRequest(userId, refreshToken) {
  console.log('send refresh request')
  const responce = await fetch('http://achieve.by:5000/api/auth/refresh?api-version=1.1', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ userId: userId, refreshToken: refreshToken })
  })
  return responce.ok ? await responce.json() : null
}

function SaveUserData(tokens) {
  localStorage.setItem('auth-token', tokens.authToken)
  localStorage.setItem('refresh-token', tokens.refreshToken)
  localStorage.setItem('user-id', tokens.userId)
  console.log('save user data to LS', tokens)
}

function LoadUserData() {
  var authToken = localStorage.getItem('auth-token')
  var refreshToken = localStorage.getItem('refresh-token')
  var userId = localStorage.getItem('user-id')

  if (authToken == null || refreshToken == null || userId == null) return null
  console.log('load user data from LS', { authToken, refreshToken, userId })
  return { authToken, refreshToken, userId: Number(userId) }
}

function CleanUserData() {
  console.log('remove user data from LS')
  localStorage.removeItem('auth-token')
  localStorage.removeItem('refresh-token')
  localStorage.removeItem('user-id')
}
