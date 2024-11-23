<script setup>
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../Stores/AuthStore'
import axios from 'axios'

const router = useRouter()
const authStore = useAuthStore()

const emailInput = ref()
const passwordInput = ref()

const emailError = ref('')
const passwordError = ref('')
const serverError = ref('')

watch(emailInput, () => {
  emailError.value = ''
  serverError.value = ''
})

watch(passwordInput, () => {
  passwordError.value = ''
  serverError.value = ''
})

const loginDisabled = computed(() => {
  return passwordError.value != '' || emailError.value != '' || serverError.value != ''
})

async function Login() {
  if (validateInputs()) {
    const path = 'https://achieve.by:5000/api/auth/login?api-version=1.1'
    const requestData = { email: emailInput.value, password: passwordInput.value }

    axios
      .post(path, requestData)
      .then(function (responce) {
        const data = responce.data
        const tokens = {
          userId: data['userId'],
          authToken: data['authToken'],
          refreshToken: data['refreshToken']
        }
        authStore.login(tokens)
        router.push('/')
      })
      .catch((error) => {
        console.log(error)
        serverError.value = 'Неправильный логин или пароль'
      })
  }
}

function validateInputs() {
  let result = true

  if (emailInput.value.length == 0) {
    emailError.value = 'Введите почту'
    result = false
  }
  const emailRegex = /^\S+@\S+\.\S+$/
  if (!emailRegex.test(emailInput.value)) {
    emailError.value = 'Вы ввели недействительную почту'
    result = false
  }

  if (passwordInput.value.length == 0) {
    passwordError.value = 'Введите пароль'
    result = false
  }

  if (passwordInput.value.length < 6) {
    passwordError.value = 'Недействительный пароль'
    result = false
  }

  if (!/[A-z]/.test(passwordInput.value)) {
    passwordError.value = 'Недействительный пароль'
    result = false
  }

  if (!/\d/.test(passwordInput.value)) {
    passwordError.value = 'Недействительный пароль'
    result = false
  }

  return result
}
</script>

<template>
  <header>
    <h1 id="title">Вход в аккаунт</h1>
    <h3 id="subtitle">
      <span>или&nbsp;</span>
      <a href="registration">зарегистрируйтесь</a>
    </h3>
  </header>
  <main>
    <div id="login-form">
      <div class="field">
        <label for="email" class="input-label">Почта</label>
        <input
          v-model.trim="emailInput"
          class="custom-input"
          placeholder="email@mail.com"
          type="email"
        />
        <p class="error" v-if="emailError">{{ emailError }}</p>
      </div>
      <div class="field">
        <label class="input-label">Пароль</label>
        <input
          v-model.trim="passwordInput"
          class="custom-input"
          placeholder="•••••••••"
          type="password"
        />
        <p class="error" v-if="passwordError">{{ passwordError }}</p>
        <a href="#" class="input-help">Забыли пароль?</a>
      </div>
      <button @click="Login" id="login-button" :disabled="loginDisabled">Войти</button>
      <p class="error" v-if="serverError">{{ serverError }}</p>
    </div>
  </main>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

#title {
  display: flex;
  align-items: center;
  font-size: 26pt;
  font-weight: 400;
  line-height: 30pt;
  color: var(--primary);
}

#subtitle {
  display: flex;
  justify-content: flex-start;
  font-size: 20pt;
  font-weight: 400;
  line-height: 28pt;
  color: var(--secondary);
}

#subtitle a {
  color: var(--primary);
  text-shadow: var(--shadow) 0 0 2px;
}

main {
  display: flex;
  justify-content: center;
}

#login-form {
  background-color: var(--tertiary);
  color: var(--on-tertiary);
  padding: 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 60px 20px 0 20px;
}

.field {
  width: 100%;
}

.input-label {
  font-size: 10pt;
  display: block;
  margin: 5px;
}

.custom-input {
  font-size: 15pt;
  background-color: var(--background);
  color: var(--primary);
  padding: 7px;
  width: 100%;
  border-radius: 5px;
  border: none;
}

.custom-input::placeholder {
  opacity: 0.25;
}

.custom-input:focus {
  box-shadow: 0 0 6px 0.1rem var(--shadow);
}

.custom-input:not(:focus) {
  box-shadow: 0 0 6px 0.1rem var(--inverse-shadow);
}

.error {
  background-color: var(--secondary);
  color: var(--on-secondary);
  font-size: 10pt;
  margin-top: 7px;
  padding: 3px;
  display: inline-block;
  border-radius: 5px;
}

.input-help {
  display: block;
  font-size: 10pt;
  color: var(--primary);
  margin: 7px 0;
  text-shadow: var(--shadow) 0 0 2px;
}

#login-button {
  color: var(--on-primary);
  font-size: 15pt;
  font-weight: bold;
  padding: 8px 26px 8px 26px;
  background-color: var(--primary);
  border: 0;
  border-radius: 18px;
  cursor: pointer;
}

#login-button:disabled {
  background-color: var(--secondary);
  color: var(--tertiary);
  cursor: not-allowed;
}
</style>
