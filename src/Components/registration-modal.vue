<template>
  <div class="container" >
    <br />
    <div class="content">
      <div id="sms-modal-text">
        <p style="text-align: center" class="modal-text">Подтверждение адреса</p>
        <p style="text-align: center" class="modal-text">электронной почты</p>
        <p style="text-align: center" class="modal-text">Вы получили код по электронной почте</p>
        <p style="text-align: center" class="modal-text">{{ Account.emailAddress }}</p>
      </div>
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
      <div class="button-cont">
        <button v-if=" input.inputPart1 != '' && input.inputPart2 != '' && input.inputPart3 != '' && input.inputPart4 != ''" class="login-button1" @click="proofRegisterCode">Отправить</button> 
        <button  class="login-button1" @click.self="close">Закрыть</button>
      </div>
      </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  props: {
    Account: {
      type: Object,
      required: true
    }
  },
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
      let responce1 = await fetch('https://achieve.by:5000/api/email/validate_code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          emailAddress: this.Account.emailAddress,
          proofcode: Number(this.proofCode)
        })
      })
      if (responce1.ok) {
        let responce2 = await fetch('https://achieve.by:5000/api/auth/registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            firstName: this.Account.firstName,
            lastName: this.Account.lastName,
            emailAddress: this.Account.emailAddress,
            avatarURL: this.Account.avatarURL,
            clubId: this.Account.clubId,
            password: this.Account.password,
            proofcode: this.proofCode
          })
        })
        if (responce2.ok) {
          this.router.push('/')
        }
        if (responce2.value == 400) {
          console.log(this.proofCode)
          proofCodeError.value = 'Неверный код'
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
.button-cont{
  display:flex;
  justify-content: space-around;
  margin-top:3%;
  gap:5%;
}
@media(max-width:1100px){
  .button-cont{
    display:flex;
    flex-direction: column
  }
}
#login-button {
  color: var(--on-tertiary);
  font-size: 15pt;
  font-weight: bold;
  padding: 10px 20px 10px 20px;
  background-color: var(--modal-back);
  border: 0;
  border-radius: 20px;
  cursor: pointer;
  width:100%;
}
.login-button1 {
  height: 20%;
  text-align: center;
  color: var(--secondary);
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 30px 10px 30px;
  background-color: var(--on-tertiary);
  border: 0;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 5%;
}
.container {
  max-width: 30%;
  height: 60vh;
  margin: 0 auto;
  margin-top: 10%;
  position: fixed;
  inset: 0;
  z-index: 10;
  background-color: var( --background) !important;
  border-radius: 5px;
  box-shadow: 0 0 6px .1rem var(  --shadow);
}
.errors {
  color: red;
  margin-top:5%;
}
@media (max-width: 782px) {
  .container {
    max-width: 40%;
    max-height: 50%;
    margin: 0 auto;
    margin-top: 20%;
    position: fixed;
    inset: 0;
    z-index: 10;
    background-color: #0e1316;
    border-radius: 5px;
    box-shadow: 0 0 6px .1rem var(  --shadow);
  }
}
@media (max-width: 577px) {
  .container {
    max-width: 50%;
    max-height: 55%;
    margin: 0 auto;
    margin-top: 30%;
    position: fixed;
    inset: 0;
    z-index: 10;
    background-color: #0e1316;
    border-radius: 5px;
    box-shadow: 0 0 6px .1rem var(  --shadow);
  }
  .modal-text {
    font-size: 15px;
    text-align: justify;
  }
}
@media (max-width: 435px) {
  .container {
    max-width: 10%;
    max-height: 55%;
    margin: 0 auto;
    margin-top: 50%;
    position: fixed;
    inset: 0;
    z-index: 10;
    background-color: #0e1316;
    border-radius: 5px;
    box-shadow: 0 0 6px .1rem var(  --shadow);
  }
  
  .modal-text {
    font-size: 13px;
    text-align: justify;
   
  }
}
@media (max-width: 410px) {
  .container {
    max-width: 15%;
    height: 65vh !important;
    margin: 0 auto;
    margin-top: 50%;
    position: fixed;
    inset: 0;
    z-index: 10;
    background-color: #0e1316;
    border-radius: 5px;
    box-shadow: 0 0 6px .1rem var(  --shadow);
  }
  .login-button1{
    height:5vh;
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
  color:var( --primary) !important;
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
  background: var(--on-primary);
  border:0;
  box-shadow: 0 0 6px .1rem var(--primary);
  border-radius: 15px !important;
  font-size: 15px;
  padding: 1%;
  text-align: center;
  margin-top: 15%;
  color:  var(--primary);
}
.input-part:focus{
  box-shadow: 0 0 6px .1rem var(  --shadow);

}
.input-part:hover{
  box-shadow: 0 0 6px .1rem var(  --shadow);

}
.input-part:first-child {
  border-radius: 5%;
}
.input-part:last-child {
  border-radius: 5%;
}
@media (max-width: 768px) {
  .field {
    width: 85%;
  }
}
</style>
