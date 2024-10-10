<script setup>
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const emailInput = ref('v@v.vv')
const passwordInput = ref('vlad8888')

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
    const path = '/api/auth/login?api-version=1.1'
    const requestData = { email: emailInput.value, password: passwordInput.value }
    const requestOptions = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(requestData)
    }
    const responce = await fetch(path, requestOptions)
    if (responce.ok) {
      //router.push('/')
    } else {
      serverError.value = 'Неправильный логин или пароль'
    }
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
    <div id="title">
      <h1>Вход в аккаунт</h1>
      <select class="change-lang" style="display: none">
        <option value="ru">RU</option>
        <option value="en">EN</option>
        <option value="pl">PL</option>
      </select>
    </div>
    <div id="subtitle">
      <h3>
        <span>или </span>
        <a href="registration">зарегистрируйтесь</a>
      </h3>
    </div>
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
    </div>
  </main>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

#title {
  display: flex;
  align-items: center;
}

#subtitle {
  display: flex;
  justify-content: flex-start;
  color: #d1d6d9;
}

#subtitle a {
  color: #80d4d6;
}

#title > h1 {
  color: #d1d6d9;
  font-size: 20pt;
}

#title > .change-lang {
  margin: 10px;
  border: 2px solid #80d4d6;
  border-radius: 10px;
  padding: 7px;
  background-color: #151e1d;
  color: #d9dee1;
  cursor: pointer;
  font-weight: bold;
}

main {
  display: flex;
  justify-content: center;
}

#login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 700px;
  margin: 60px 40px 0 40px;
}

.field {
  width: 100%;
}

.input-label {
  color: #bdc7c8;
  font-size: 10pt;
  display: block;
  margin: 5px;
}

.custom-input {
  font-size: 15pt;
  background-color: #0e1316;
  color: #d9dee1;
  padding: 7px;
  width: 100%;
  border-radius: 5px;
}

.custom-input::placeholder {
  color: #bdc7c8;
  opacity: 0.25;
}

.custom-input:focus {
  border-color: transparent;
  box-shadow: 0 0 1px 0.2rem #80d5d6a9;
}

.custom-input:not(:focus) {
  border: 2px solid gray;
}

.is-error {
  border-bottom: 3px solid orangered;
}

.is-hidden {
  display: none !important;
}

.error {
  color: orangered;
  font-size: 10pt;
  margin: 3px;
}

.error-message {
  color: orangered;
  font-size: 10pt;
  margin: 0 0 10px 0;
  text-align: center;
}

.input-help {
  display: block;
  font-size: 10pt;
  color: #80d4d6;
  margin: 7px 0;
}

#login-button {
  color: #80d4d6;
  font-size: 15pt;
  font-weight: bold;
  padding: 10px 30px 10px 30px;
  background-color: #151e1d;
  border: 0;
  border-radius: 20px;
  cursor: pointer;
}

#login-button:disabled {
  color: gray;
  cursor: not-allowed;
}
</style>
