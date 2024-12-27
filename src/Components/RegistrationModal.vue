<template>
  <base-modal @on-close="close">
    <div class="wrapper">
      <p class="sms-modal-text" style="text-align: center">
        {{ $t('register.checkEmailHint', { email: Account.emailAddress, interval: 3 }) }}
      </p>
      <div class="input-container">
        <input
          :ref="input.inputPart1"
          type="text"
          class="input-part"
          maxlength="1"
          v-model="input.inputPart1"
          @input="moveFocus($event, length1)"
        />

        <input
          :ref="input.inputPart2"
          type="text"
          class="input-part"
          maxlength="1"
          v-model="input.inputPart2"
          @input="moveFocus($event, length2)"
        />

        <input
          :ref="input.inputPart3"
          type="text"
          class="input-part"
          maxlength="1"
          v-model="input.inputPart3"
          @input="moveFocus($event, length3)"
        />

        <input
          :ref="input.inputPart4"
          type="text"
          class="input-part"
          maxlength="1"
          v-model="input.inputPart4"
          @input="moveFocus($event, length4)"
        />
      </div>
      <button
        v-if="
          input.inputPart1 != '' &&
          input.inputPart2 != '' &&
          input.inputPart3 != '' &&
          input.inputPart4 != ''
        "
        class="login-button"
        @click="proofRegisterCode"
      >
        {{ $t('register.checkProofCode') }}
      </button>
      <button class="login-button" @click.self="close">
        {{ $t('register.closeModal') }}
      </button>
    </div>
  </base-modal>
</template>
<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseModal from './BaseModal.vue'
import axios from 'axios'
export default {
  props: {
    Account: {
      type: Object,
      required: true
    }
  },
  components: { BaseModal },
  data() {
    return {
      length1: '',
      length2: '',
      length3: '',
      length4: '',
      router: useRouter(),
      input: {
        inputPart1: '',
        inputPart2: '',
        inputPart3: '',
        inputPart4: ''
      },
      proofCode: ''
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    moveFocus(event, maxLength) {
      if (event.target.value.length >= maxLength) {
        const nextInput = event.target.nextElementSibling
        if (nextInput) {
          nextInput.focus()
        }
      }
    },
    async proofRegisterCode() {
      console.log('proof-login')

      this.proofCode =
        this.input.inputPart1 +
        this.input.inputPart2 +
        this.input.inputPart3 +
        this.input.inputPart4
      let responce1 = await axios.post('api/email/validate_code', {
        emailAddress: this.Account.emailAddress,
        proofcode: Number(this.proofCode)
      })
      if (responce1.status == 200) {
        let responce2 = await axios.post('api/auth/registration', {
          firstName: this.Account.firstName,
          lastName: this.Account.lastName,
          emailAddress: this.Account.emailAddress,
          avatarURL: this.Account.avatarURL,
          clubId: this.Account.clubId,
          password: this.Account.password,
          proofcode: this.proofCode
        })
        if (responce2.status == 200) {
          this.router.push('/')
        }
        if (responce2.status == 400) {
          console.log(this.proofCode)
          proofCodeError.value = 'wrongCode'
        }
      }
    }
  }
}

const proofCodeError = ref('')
// const Account = ref({
//     firstName:'',
//     lastName:'',
//     emailAddress:'',
//     clubId:1,
//     avatarURL:'',
//     password:'',
//     proofCode:''

// })
</script>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sms-modal-text {
  color: var(--on-secondary);
}

.button-cont {
  display: flex;
  justify-content: space-around;
  margin-top: 3%;
  gap: 5%;
}
@media (max-width: 1100px) {
  .button-cont {
    display: flex;
    flex-direction: column;
  }
}
.login-button {
  text-align: center;
  color: var(--secondary);
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 30px 10px 30px;
  background-color: var(--on-tertiary);
  border: 0;
  border-radius: 20px;
  cursor: pointer;
}
.container {
  height: 60vh;
  margin: 0 auto;
  position: fixed;
  inset: 0;
  z-index: 10;
  background-color: var(--background) !important;
  border-radius: 5px;
  box-shadow: 0 0 6px 0.1rem var(--shadow);
}
.errors {
  color: red;
  margin-top: 5%;
}
@media (max-width: 782px) {
  .container {
    margin: 0 auto;
    position: fixed;
    inset: 0;
    z-index: 10;
    background-color: #0e1316;
    border-radius: 5px;
    box-shadow: 0 0 6px 0.1rem var(--shadow);
  }
}
@media (max-width: 577px) {
  .container {
    margin: 0 auto;
    position: fixed;
    inset: 0;
    z-index: 10;
    background-color: #0e1316;
    border-radius: 5px;
    box-shadow: 0 0 6px 0.1rem var(--shadow);
  }
  .modal-text {
    font-size: 15px;
    text-align: justify;
  }
}
@media (max-width: 435px) {
  .container {
    margin: 0 auto;
    position: fixed;
    inset: 0;
    z-index: 10;
    background-color: #0e1316;
    border-radius: 5px;
    box-shadow: 0 0 6px 0.1rem var(--shadow);
  }

  .modal-text {
    font-size: 13px;
    text-align: justify;
  }
}
@media (max-width: 410px) {
  .container {
    height: 65vh !important;
    margin: 0 auto;
    position: fixed;
    inset: 0;
    z-index: 10;
    background-color: #0e1316;
    border-radius: 5px;
    box-shadow: 0 0 6px 0.1rem var(--shadow);
  }
  .login-button1 {
    height: 5vh;
    font-size: 0.6rem;
  }
  .modal-text {
    font-size: 13px;
    text-align: justify;
  }
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
.modal-text {
  color: var(--primary) !important;
}
.input-container {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 5%;
}
.input-part {
  width: 50px;
  height: 50px;
  background: var(--on-primary);
  border: 0;
  box-shadow: 0 0 6px 0.1rem var(--primary);
  border-radius: 15px !important;
  font-size: 20px;
  font-weight: bold;
  padding: 1%;
  text-align: center;
  color: var(--primary);
}
.input-part:focus {
  box-shadow: 0 0 6px 0.1rem var(--shadow);
}
.input-part:hover {
  box-shadow: 0 0 6px 0.1rem var(--shadow);
}
.input-part:first-child {
  border-radius: 5%;
}
.input-part:last-child {
  border-radius: 5%;
}
</style>
