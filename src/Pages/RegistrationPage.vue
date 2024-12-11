<template>
  <div v-if="isVoiceModalOpen == true">
    <regModal
      :Account="{ firstName, lastName, emailAddress, password, clubId, avatarURL }"
      @close="ModalClose"
    ></regModal>
  </div>
  <header>
    <div id="title">
      <h1>{{ $t('register.title') }}</h1>
    </div>
    <div id="subtitle">
      <h3>
        <span style="color: var(--tertiary)">{{ $t('register.or') }}</span>
        &nbsp;
        <a href="login">{{ $t('register.loginLink') }}</a>
      </h3>
    </div>
  </header>
  <main>
    <div id="login-form">
      <div class="field">
        <label class="input-label">{{ $t('register.firstName') }}</label>
        <input
          class="input"
          v-model="firstName"
          type="text"
          :placeholder="$t('register.firstNamePlaceholder')"
        />
        <div v-if="firstNameError">
          <p class="error">{{ $t(firstNameError) }}</p>
        </div>
      </div>
      <div class="field">
        <label class="input-label">{{ $t('register.lastName') }}</label>
        <input
          class="input"
          v-model="lastName"
          type="text"
          :placeholder="$t('register.lastNamePlaceholder')"
        />
        <div v-if="lastNameError">
          <p class="error">{{ $t(lastNameError) }}</p>
        </div>
      </div>
      <div class="field">
        <label class="input-label">{{ $t('register.email') }}</label>
        <input class="input" v-model="emailAddress" type="text" placeholder="email@mail.com" />
        <div v-if="emailError">
          <p class="error">{{ $t(emailError) }}</p>
        </div>
      </div>
      <div class="field">
        <label class="input-label">{{ $t('register.password') }}</label>
        <input class="input" v-model="password" type="password" placeholder="•••••••••" />
        <div v-if="passwordError">
          <p class="error">{{ $t(passwordError) }}</p>
        </div>
      </div>
      <div class="field">
        <label class="input-label">{{ $t('register.confirmPassword') }}</label>
        <input class="input" v-model="password2" type="password" placeholder="•••••••••" />
        <div v-if="confirmPasswordError">
          <p class="error">{{ $t(confirmPasswordError) }}</p>
        </div>
      </div>
      <br />
      <button type="submit" @click="sendProofCode" id="login-button">
        {{ $t('register.register') }}
      </button>
      <div v-if="registerError">
        <p class="error">{{ $t(registerError) }}</p>
      </div>
    </div>
    <locale-changer style="margin-bottom: 30px" />
  </main>
</template>
<script setup>
import { ref, watch } from 'vue'
import regModal from '../Components/RegistrationModal.vue'
import LocaleChanger from '@/Components/LocaleChanger.vue'

let lastName = ref('')
let firstName = ref('')
let password = ref('')
let emailAddress = ref('')
let avatarURL = ref('StaticFiles/dodge.gif')
let responce = ref('')
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
})
watch(responce, () => {
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
    responce.value = await fetch('https://achieve.by:5000/api/email/proof_email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept-Language': 'ru'
      },
      body: JSON.stringify(emailAddress.value)
    })
    if (responce.value.statusText == 'email') {
      isVoiceModalOpen.value = false
      registerError.value = 'register.errors.emailAlreadyUse'
    }
    ModalOpen()
  }
}
function validateInputs() {
  let result = true
  if (firstName.value.length < 2) {
    firstNameError.value = 'register.errors.firstName2Letters'
    isVoiceModalOpen.value = false
  }
  if (lastName.value.length < 5) {
    lastNameError.value = 'register.errors.lastName5Letters'
    isVoiceModalOpen.value = false
  }
  if (emailAddress.value.length == 0) {
    emailError.value = 'register.errors.enterEmail'
    isVoiceModalOpen.value = false
    result = false
  }
  const emailRegex = /^\S+@\S+\.\S+$/
  if (!emailRegex.test(emailAddress.value)) {
    emailError.value = 'register.errors.wrongEmail'
    isVoiceModalOpen.value = false
    result = false
  }

  if (password.value.length == 0) {
    passwordError.value = 'register.errors.enterPassword'
    isVoiceModalOpen.value = false
    result = false
  }

  if (password.value.length < 6) {
    passwordError.value = 'register.errors.password6Characters'
    isVoiceModalOpen.value = false
    result = false
  }

  if (!/[A-z]/.test(password.value)) {
    passwordError.value = 'register.errors.password1Letter'
    isVoiceModalOpen.value = false
    result = false
  }

  if (!/\d/.test(password.value)) {
    passwordError.value = 'register.errors.password1Digit'
    isVoiceModalOpen.value = false
    result = false
  }
  if (password.value != password2.value) {
    confirmPasswordError.value = 'register.errors.passwordNotEqualConfirmPassword'
    isVoiceModalOpen.value = false
    result = false
  }

  return result
}
</script>
<style scoped>
body {
  background-color: var(--secondary);
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#title {
  display: flex;
  align-items: center;
  margin-top: 5%;
}

#subtitle {
  display: flex;
  justify-content: flex-start;
  color: var(--primary);
}
#subtitle a {
  color: var(--primary);
}

#title > h1 {
  color: var(--primary);
  font-size: 20pt;
}

#title > .change-lang {
  margin: 10px;
  border-radius: 10px;
  padding: 7px;
  background-color: #151e1d;
  color: #d9dee1;
  cursor: pointer;
  font-weight: bold;
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
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 20px 5px 20px;
  gap: 7px;
}

@media (min-height: 600px) {
  #login-form {
    margin-top: 40px;
  }
}

.input-label {
  color: var(--outline);
  font-size: 10pt;
  display: block;
  margin: 5px;
}

.input {
  font-size: 15pt;
  background-color: var(--background);
  border: 0;
  color: var(--outline);
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 0 6px 0.1rem var(--inverse-shadow);
  width: 100%;
}
.input:focus {
  box-shadow: 0 0 6px 0.1rem var(--shadow);
}
.input::placeholder {
  color: var(--primary);
  opacity: 0.25;
}

.is-error {
  border-bottom: 3px solid var(--error);
}

.error {
  color: var(--on-secondary);
  font-size: 12pt;
  margin-top: 6px;
}

#login-button {
  color: var(--on-primary);
  font-size: 15pt;
  font-weight: bold;
  padding: 10px 20px 10px 20px;
  background-color: var(--on-tertiary);
  border: 0;
  border-radius: 20px;
  cursor: pointer;
}

.field {
  width: 100%;
}

.content {
  padding: 4%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
#btn-close {
  border: none;
  background: none;
}
.text {
  padding: 4%;
}
#modal-text {
  margin-bottom: 5%;
}
.input-container {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 5%;
}
.input-part {
  width: 18%;
  height: 10vh;
  background: none;
  border: 2px solid #929696;
  border-radius: 15px !important;
  font-size: 15px;
  padding: 1%;
  text-align: center;
  margin-top: 15%;
}
.input-part:first-child {
  border-radius: 5%;
}
.input-part:last-child {
  border-radius: 5%;
}
</style>
