<script setup>
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../Stores/AuthStore'
import axios from 'axios'
import ForgotPasswordModal from '@/Components/ForgotPasswordModal.vue'
import LocaleChanger from '@/Components/LocaleChanger.vue'

const router = useRouter()
const authStore = useAuthStore()

const emailInput = ref('')
const passwordInput = ref('')

const emailError = ref('')
const passwordError = ref('')
const serverError = ref('')

const showModal = ref(false)

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
  if (ValidateInputs()) {
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
        serverError.value = 'login.errors.wrongLoginOrPassword'
      })
  }
}

function ValidateInputs() {
  let result = true

  const emailRegex = /^\S+@\S+\.\S+$/

  if (emailInput.value.length == 0) {
    emailError.value = 'login.errors.enterEmail'
    result = false
  } else if (!emailRegex.test(emailInput.value)) {
    emailError.value = 'login.errors.wrongEmail'
    result = false
  }

  if (passwordInput.value.length == 0) {
    passwordError.value = 'login.errors.enterPassword'
    result = false
  } else if (passwordInput.value.length < 6) {
    passwordError.value = 'login.errors.password6Characters'
    result = false
  } else if (!/[A-z]/.test(passwordInput.value)) {
    passwordError.value = 'login.errors.password1Letter'
    result = false
  } else if (!/\d/.test(passwordInput.value)) {
    passwordError.value = 'login.errors.password1Digit'
    result = false
  }

  return result
}
</script>

<template>
  <forgot-password-modal v-if="showModal" @on-close="showModal = false" />
  <header>
    <h1 id="title">{{ $t('login.title') }}</h1>
    <h3 id="subtitle">
      <span>{{ $t('login.or') }}&nbsp;</span>
      <a href="registration">{{ $t('login.registerLink') }}</a>
    </h3>
  </header>
  <main>
    <div id="login-form">
      <div class="field">
        <label for="email" class="input-label">{{ $t('login.email') }}</label>
        <input
          v-model.trim="emailInput"
          class="custom-input"
          placeholder="email@mail.com"
          type="email"
        />
        <p class="error" v-if="emailError">{{ $t(emailError) }}</p>
      </div>
      <div class="field">
        <label class="input-label">{{ $t('login.password') }}</label>
        <input
          v-model.trim="passwordInput"
          class="custom-input"
          placeholder="•••••••••"
          type="password"
        />
        <p class="error" v-if="passwordError">{{ $t(passwordError) }}</p>
        <a @click="showModal = true" class="input-help">{{ $t('login.forgotPassword') }}</a>
      </div>
      <button @click="Login" id="login-button" :disabled="loginDisabled">
        {{ $t('login.login') }}
      </button>
      <p class="error" v-if="serverError">{{ $t(serverError) }}</p>
    </div>
    <locale-changer style="margin-bottom: 30px" />
  </main>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
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
  flex-direction: column;
  align-items: center;
  gap: 10px;
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
  cursor: pointer;
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
