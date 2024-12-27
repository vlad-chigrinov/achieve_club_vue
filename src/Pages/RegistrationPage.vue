<template>
  <div v-if="isVoiceModalOpen == true">
    <regModal
      :Account="{ firstName, lastName, emailAddress, password, clubId, avatarURL }"
      @close="ModalClose"
    ></regModal>
  </div>
  <header>
    <h1 id="title">{{ $t('register.title') }}</h1>
    <h3 id="subtitle">
      <span>{{ $t('register.or') }}&nbsp;</span>
      <a href="login">{{ $t('register.loginLink') }}</a>
    </h3>
  </header>
  <main>
    <div id="login-form">
      <div class="field">
        <label class="input-label">{{ $t('register.firstName') }}</label>
        <input
          class="custom-input"
          v-model.trim="firstName"
          type="text"
          :placeholder="$t('register.firstNamePlaceholder')"
        />
        <p class="error" v-if="firstNameError">{{ $t(firstNameError) }}</p>
      </div>
      <div class="field">
        <label class="input-label">{{ $t('register.lastName') }}</label>
        <input
          class="custom-input"
          v-model="lastName"
          type="text"
          :placeholder="$t('register.lastNamePlaceholder')"
        />
        <p class="error" v-if="lastNameError">{{ $t(lastNameError) }}</p>
      </div>
      <div class="field">
        <label class="input-label">{{ $t('register.email') }}</label>
        <input
          class="custom-input"
          v-model="emailAddress"
          type="text"
          placeholder="email@mail.com"
        />
        <p class="error" v-if="emailError">{{ $t(emailError) }}</p>
      </div>
      <div class="field">
        <label class="input-label">{{ $t('register.password') }}</label>
        <input class="custom-input" v-model="password" type="password" placeholder="•••••••••" />
        <p class="error" v-if="passwordError">{{ $t(passwordError) }}</p>
      </div>
      <div class="field">
        <label class="input-label">{{ $t('register.confirmPassword') }}</label>
        <input class="custom-input" v-model="password2" type="password" placeholder="•••••••••" />
        <p class="error" v-if="confirmPasswordError">{{ $t(confirmPasswordError) }}</p>
      </div>
      <button @click="sendProofCode" id="login-button">
        {{ $t('register.register') }}
      </button>
      <p class="error" v-if="registerError">{{ $t(registerError) }}</p>
    </div>
    <locale-changer style="margin-bottom: 30px" />
  </main>
</template>
<script setup>
import { ref, watch } from 'vue'
import regModal from '../Components/RegistrationModal.vue'
import LocaleChanger from '@/Components/LocaleChanger.vue'
import axios from 'axios'

let lastName = ref('')
let firstName = ref('')
let password = ref('')
let emailAddress = ref('')
let avatarURL = ref('StaticFiles/dodge.gif')
let clubId = ref(1)

const isVoiceModalOpen = ref(false)
const password2 = ref('')

let passwordError = ref()
let confirmPasswordError = ref()
let emailError = ref()
let firstNameError = ref()
let lastNameError = ref()
let registerError = ref()

watch(emailAddress, () => {
  emailError.value = ''
  registerError.value = ''
})

watch(password, () => {
  passwordError.value = ''
})

watch(firstName, () => {
  firstNameError.value = ''
})
watch(lastName, () => {
  lastNameError.value = ''
})
watch(password2, () => {
  confirmPasswordError.value = ''
})

function ModalOpen() {
  isVoiceModalOpen.value = true
}
function ModalClose() {
  isVoiceModalOpen.value = false
}

async function sendProofCode() {
  if (validateInputs()) {
    await axios
      .post('api/email/proof_email', emailAddress.value, {
        headers: {
          'Content-Type': 'application/json-patch+json;charset=utf-8'
        }
      })
      .then(() => ModalOpen())
      .catch((err) => {
        console.log(err)
        if (err.response.data == 'email') {
          registerError.value = 'register.errors.emailAlreadyUse'
        } else if (err.response.data == 'timeout') {
          ModalOpen()
        }
      })
  }
}
function validateInputs() {
  let result = true
  if (firstName.value.length < 2) {
    firstNameError.value = 'register.errors.firstName2Letters'
  }
  if (lastName.value.length < 5) {
    lastNameError.value = 'register.errors.lastName5Letters'
  }
  if (emailAddress.value.length == 0) {
    emailError.value = 'register.errors.enterEmail'
    result = false
  }
  const emailRegex = /^\S+@\S+\.\S+$/
  if (!emailRegex.test(emailAddress.value)) {
    emailError.value = 'register.errors.wrongEmail'
    result = false
  }

  if (password.value.length == 0) {
    passwordError.value = 'register.errors.enterPassword'
    result = false
  }

  if (password.value.length < 6) {
    passwordError.value = 'register.errors.password6Characters'
    result = false
  }

  if (!/[A-z]/.test(password.value)) {
    passwordError.value = 'register.errors.password1Letter'
    result = false
  }

  if (!/\d/.test(password.value)) {
    passwordError.value = 'register.errors.password1Digit'
    result = false
  }
  if (password.value != password2.value) {
    confirmPasswordError.value = 'register.errors.passwordNotEqualConfirmPassword'
    result = false
  }

  return result
}
</script>
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
  margin-top: 10px;
}

#login-button:disabled {
  background-color: var(--secondary);
  color: var(--tertiary);
  cursor: not-allowed;
}
</style>
