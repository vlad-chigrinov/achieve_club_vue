<script setup>
import axios from 'axios'
import BaseModal from './BaseModal.vue'
import { ref, watch, defineEmits } from 'vue'
import VOtpInput from 'vue3-otp-input'

defineEmits(['on-close'])

const currentStep = ref(0)

const emailInput = ref('')
const emailError = ref('')

const isOtpLoading = ref(false)
const isOtpError = ref(false)
const otpRef = ref(null)
const proofCodeInput = ref('')

const passwordInput = ref('')
const passwordError = ref('')
const password2Input = ref('')
const password2Error = ref('')

watch(emailInput, () => emailError.value == '')

watch(passwordInput, () => {
  passwordError.value = ''
  password2Error.value = ''
})

watch(password2Input, () => {
  password2Error.value = ''
})

async function SendProofCode() {
  if (ValidateEmail() == false) return

  await axios
    .post('https://achieve.by:5000/api/email/change_password', emailInput.value, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(() => (currentStep.value = 1))
    .catch((err) => {
      if (err.response.status != 409) {
        emailError.value = 'forgotPassword.errors.serverError' + err.response.status
        return
      }

      if (err.response.data == 'email') {
        emailError.value = 'forgotPassword.errors.userWithEmailNotFound'
        return
      }

      currentStep.value = 1
    })
}

function ValidateEmail() {
  if (emailInput.value == '') {
    emailError.value = 'forgotPassword.errors.enterEmail'
    return false
  }

  const emailRegex = /^\S+@\S+\.\S+$/
  if (!emailRegex.test(emailInput.value)) {
    emailError.value = 'forgotPassword.errors.wrongEmail'
    return false
  }

  return true
}

async function ValidateProofCode(value) {
  isOtpLoading.value = true

  await axios
    .post('https://achieve.by:5000/api/email/validate_code', {
      emailAddress: emailInput.value,
      proofCode: value
    })
    .then(() => {
      proofCodeInput.value = value
      otpRef.value?.clearInput()
      isOtpLoading.value = false
      currentStep.value = 2
    })
    .catch(() => {
      isOtpError.value = true
      otpRef.value?.clearInput()
      isOtpLoading.value = false
    })
}

async function ChangePassword() {
  if (ValidatePassword()) {
    await axios
      .patch('https://achieve.by:5000/api/auth/change_password', {
        emailAddress: emailInput.value,
        proofCode: proofCodeInput.value,
        password: passwordInput.value
      })
      .then(() => {
        currentStep.value = 3
      })
      .catch(() => (currentStep.value = 0))
  }
}

function ValidatePassword() {
  let result = true

  if (passwordInput.value.length == 0) {
    passwordError.value = 'forgotPassword.errors.enterPassword'
    result = false
  } else if (passwordInput.value.length < 6) {
    passwordError.value = 'forgotPassword.errors.password6Characters'
    result = false
  } else if (!/[A-z]/.test(passwordInput.value)) {
    passwordError.value = 'forgotPassword.errors.password1Letter'
    result = false
  } else if (!/\d/.test(passwordInput.value)) {
    passwordError.value = 'forgotPassword.errors.password1Digit'
    result = false
  }

  if (password2Input.value != passwordInput.value) {
    password2Error.value = 'forgotPassword.errors.passwordNotEqualConfirmPassword'
    result = false
  }

  return result
}
</script>

<template>
  <base-modal>
    <div class="wrapper">
      <div class="title-wrapper">
        <h3>{{ $t('forgotPassword.title') }}</h3>
        <button @click="$emit('on-close')" class="close-button">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <template v-if="currentStep == 0">
        <p>{{ $t('forgotPassword.enterEmailHint') }}</p>
        <div class="field">
          <label for="email" class="input-label">{{ $t('forgotPassword.email') }}</label>
          <input
            v-model.trim="emailInput"
            @keydown.enter="SendProofCode"
            class="custom-input"
            placeholder="email@mail.com"
            type="email"
          />
        </div>
        <p class="error" v-if="emailError">{{ $t(emailError) }}</p>
        <button type="submit" class="action-button" @click="SendProofCode">
          {{ $t('forgotPassword.sendCode') }}
        </button>
      </template>
      <template v-else-if="currentStep == 1">
        <p>{{ $t('forgotPassword.checkEmailHint', { email: emailInput, interval: 3 }) }}</p>
        <div class="code-field">
          <label class="input-label">{{ $t('forgotPassword.enterCodeHint') }}</label>
          <v-otp-input
            ref="otpRef"
            :should-auto-focus="true"
            :should-focus-order="true"
            input-classes="otp-input"
            inputType="numeric"
            :num-inputs="4"
            :placeholder="['&bull;', '&bull;', '&bull;', '&bull;']"
            @on-complete="ValidateProofCode"
            :is-disabled="isOtpLoading"
          />
        </div>
        <p class="error" v-if="isOtpError">{{ $t('forgotPassword.errors.wrongCodeMessage') }}</p>
      </template>
      <template v-else-if="currentStep == 2">
        <p>{{ $t('forgotPassword.newPasswordHint') }}</p>
        <div class="field">
          <label class="input-label">{{ $t('forgotPassword.password') }}</label>
          <input
            v-model.trim="passwordInput"
            class="custom-input"
            placeholder="•••••••••"
            type="password"
          />
        </div>
        <p class="error" v-if="passwordError">{{ $t(passwordError) }}</p>
        <div class="field">
          <label class="input-label">{{ $t('forgotPassword.passwordConfirm') }}</label>
          <input
            v-model.trim="password2Input"
            class="custom-input"
            placeholder="•••••••••"
            type="password"
          />
        </div>
        <p class="error" v-if="password2Error">{{ $t(password2Error) }}</p>
        <button type="submit" class="action-button" @click="ChangePassword">
          {{ $t('forgotPassword.changePassword') }}
        </button>
      </template>
      <template v-else>
        <p>{{ $t('forgotPassword.successMessage') }}</p>
        <a @click="$emit('on-close')" class="back-button">
          <i class="fa-solid fa-left"></i>
          &nbsp; {{ $t('forgotPassword.backToLogin') }}
        </a>
      </template>
    </div>
  </base-modal>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.title-wrapper {
  display: flex;
  align-items: center;
  gap: 5px;
}

.close-button {
  border-radius: 50%;
  width: 27px;
  height: 27px;
  font-size: 20px;
  line-height: 0;
  border: none;
  background-color: var(--primary);
  color: var(--on-primary);
  cursor: pointer;
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
  background-color: var(--tertiary);
  color: var(--on-tertiary);
  padding: 7px;
  width: 100%;
  border-radius: 5px;
  border: none;
}

.custom-input:focus {
  box-shadow: 0 0 6px 0.1rem var(--shadow);
}

.custom-input::placeholder {
  opacity: 0.25;
  color: var(--on-secondary);
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

.action-button {
  color: var(--on-primary);
  font-size: 11pt;
  font-weight: bold;
  padding: 8px 26px 8px 26px;
  background-color: var(--primary);
  border: 0;
  border-radius: 18px;
  cursor: pointer;
}

.action-button:disabled {
  background-color: var(--secondary);
  color: var(--tertiary);
  cursor: not-allowed;
}

.code-field {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.back-button {
  cursor: pointer;
  background: var(--tertiary);
  padding: 5px;
  border-radius: 10px;
}
</style>

<style>
.otp-input-container {
  gap: 10px;
}

.otp-input {
  width: 60px;
  height: 60px;
  padding: 10px;
  font-size: 20px;
  border-radius: 50%;
  border: none;
  text-align: center;
  user-select: none;
  background: none;
  font-weight: bold;
}

.otp-input.is-complete {
  color: var(--on-tertiary);
  background-color: var(--tertiary);
}

.otp-input:focus {
  color: var(--on-secondary);
  background-color: var(--secondary);
}

.otp-input:disabled {
  animation: l1 1s infinite;
  opacity: 0.75;
}

@keyframes l1 {
  to {
    transform: rotate(1turn);
  }
}

.otp-input::placeholder {
  color: var(--on-secondary);
  font-size: 15px;
  text-align: center;
  font-weight: bold;
}

.otp-input:focus::placeholder {
  color: transparent;
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
