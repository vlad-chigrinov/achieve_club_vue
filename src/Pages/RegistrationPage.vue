<template>
  <header>
    <div id="title">
      <h1>Зарегистрируйтесь</h1>
    </div>
    <div id="subtitle">
      <h3>
        <span>или </span>
        <a href="login">войдите в аккаунт</a>
      </h3>
    </div>
  </header>
  <main>
    <div id="login-form">
      <div class="field">
        <label class="input-label">Имя</label>
        <input class="input" v-model="firstName" type="text" placeholder="Введите имя..." />
        <div v-if="firstNameError">
          <p class="error">{{firstNameError}}</p>
        </div>
      </div>
      <div class="field">
        <label class="input-label">Фамилия</label>
        <input class="input" v-model="lastName" type="text" placeholder="Введите фамилию..." />
        <div v-if="lastNameError">
          <p class="error">{{lastNameError}}</p>
        </div>
      </div>
      <div class="field">
        <label class="input-label">E-mail</label>
        <input class="input" v-model="emailAddress" type="text" placeholder="email@mail.com" />
        <div v-if="emailError">
          <p class="error">{{emailError}}</p>
        </div>
      </div>
      <div class="field">
        <label class="input-label">Пароль</label>
        <input class="input" v-model="password" type="password" placeholder="•••••••••" />
        <div v-if="passwordError">
          <p class="error">{{passwordError}}</p>
        </div>
      </div>
      <div class="field">
        <label class="input-label">Подтверждение пароля</label>
        <input class="input" v-model="password2" type="password" placeholder="•••••••••" />
        <div v-if="passwordError">
          <p class="error">{{passwordError}}</p>
        </div>
      </div>
      <div v-show="textError != ''">
        <p class="error">{{textError}}</p>
      </div>
      <button type="submit" @click="login" id="login-button">Зарегистрироваться</button>
    </div>
    <div v-if="isVoiceModalOpen == true">
      <div class="container">
        <br>
        <div class="content">
          <div id="sms-modal-text">
            <p style="text-align: center;font-size:18px;" id="modal-text">Подтверждение адреса</p>
            <p style="text-align: center;font-size:18px"> электронной почты</p>
            <p style="text-align: center;font-size:15px" id="modal-text">Вы получили код по электронной почте</p>
            <p style="text-align: center;" id="modal-text">{{emailAddress}}</p>
          </div>
          <div class="input-container">
            <input type="text" ref="lenght1" class="input-part" maxlength="1" v-model="v1"  @input="moveFocus($event, length1)"/>
            <input type="text" class="input-part" maxlength="1" v-model="v2"  @input="moveFocus($event, length2)"  />
            <input type="text" class="input-part" maxlength="1" v-model="v3"  @input="moveFocus($event, length3)"  />
            <input type="text" class="input-part" maxlength="1" v-model="v4"  @input="moveFocus($event, length4)"  />
          </div>
          <button id="login-button1" @click="proofLogin">Отправить</button>
        </div>
      </div>
    </div>  
  </main>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const v1 = ref('');
const v2 = ref('');
const v3 = ref('');
const v4 = ref('');

const router = useRouter()
const password = ref('')
const emailAddress = ref('')
const isVoiceModalOpen = ref(false);
const lastName = ref('')
const firstName = ref('');
const clubId = 1
const password2 = ref('')
const avatarURL = 'StaticFiles/dodge.gif'
let textError = ref('')
const proofCode = ref('')
let responce = ref('')
let length1 = ref('');
let length2 = ref('');
let length3 = ref('');
let length4 = ref('');
let passwordError = ref('');
let emailError = ref('');
let firstNameError = ref('');
let lastNameError = ref('');


function ModalOpen(){
  switch(responce.value){
    case 200:
      isVoiceModalOpen.value = true;
      break;
      case 409:
        isVoiceModalOpen.value = false;
        textError.value = 'Такой полдьзователь уже есть\nлибо код ранее был отправлен на почту'
        isVoiceModalOpen.value = false;
        break;
        case 400:
          isVoiceModalOpen.value = false;
            textError.value='Одно или несколько полей не были заполнены'
          break;
  }
}
const proofLogin = async () => {
  console.log(responce.value)
  if (responce.value == "200") {
    proofCode.value = v1.value + v2.value + v3.value + v4.value;
    let responce1 = await fetch('https://achieve.by:5000/api/email/validate_code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({emailAddress:emailAddress.value, proofCode:Number(proofCode.value)})
    })
    if (responce1.ok) {
      let responce2 = await fetch('https://achieve.by:5000/api/auth/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({firstName:firstName.value,lastName:lastName.value,emailAddress:emailAddress.value,clubId,avatarURL,password:password.value,proofCode:Number(proofCode.value)})
      })
      if (responce2.ok) {
        router.push('/')
      }
      if(responce.value == 400){
        console.log(proofCode.value);
      }
    }
  }
}
function moveFocus(event, maxLength) {
      if (event.target.value.length >= maxLength) {
        const nextInput = event.target.nextElementSibling;
        if (nextInput) {
          nextInput.focus();
        }
      }
      if(event.target.value === 'backspace'){
        const nextInput = event.target.previousElementSibling;
        if (nextInput) {
          nextInput.focus();
        }
      }
}

const login = async () => {
  if(validateInputs()){
    const res = await fetch('https://achieve.by:5000/api/email/proof_email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept-Language': 'ru'
      },
      body: JSON.stringify(emailAddress.value)
    })
    responce.value = res.status
    ModalOpen();
  }
  }
function validateInputs() {
  let result = true
  if(firstName.value.length<=2){
    firstNameError.value = 'Имя должно содержать не менее 2 символов'
  }
  if(lastName.value.length<=5){
    lastNameError.value = 'Имя должно содержать не менее 5 символов'
  }
  if (emailAddress.value.length == 0) {
    emailError.value = 'Введите почту'
    result = false
  }
  const emailRegex = /^\S+@\S+\.\S+$/
  if (!emailRegex.test(emailAddress.value)) {
    emailError.value = 'Вы ввели недействительную почту'
    result = false
  }

  if (password.value.length == 0) {
    passwordError.value = 'Введите пароль'
    result = false
  }

  if (password.value.length < 6) {
    passwordError.value = 'Недействительный пароль'
    result = false
  }

  if (!/[A-z]/.test(password.value)) {
    passwordError.value = 'Недействительный пароль'
    result = false
  }

  if (!/\d/.test(password.value)) {
    passwordError.value = 'Недействительный пароль'
    result = false
  }

  return result
}
</script>
<style scoped>
*{
  margin:0;
  padding:0;
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
}

#subtitle {
  display: flex;
  justify-content: flex-start;
  color: #d1d6d9;
}
main {
  margin-bottom: 10%;
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

#login-form {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-label {
  color: #bdc7c8;
  font-size: 10pt;
  display: block;
  margin: 5px;
}

.input {
  font-size: 15pt;
  background-color: #0e1316;
  border: 0;
  border-bottom: 3px solid #80d4d6;
  color: #d9dee1;
  padding: 5px;
  width: 100%;
}

.input::placeholder {
  color: #bdc7c8;
  opacity: 0.25;
}

.is-error {
  border-bottom: 3px solid orangered;
}

.error {
  color: orangered;
  font-size: 10pt;
  margin: 3px;
}

.input-help {
  display: block;
  font-size: 10pt;
  color: #80d4d6;
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
#login-button1 {
  color: #80d4d6;
  font-size: 15pt;
  font-weight: bold;
  padding: 10px 30px 10px 30px;
  background-color: #151e1d;
  border: 0;
  border-radius: 20px;
  cursor: pointer;
  margin-top:5%;
}

.field {
  margin-bottom: 10px;
  width: 30%;
}
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.container{
  max-width:30%;
  max-height:40vh;
  margin:0 auto;
  margin-top:10%;
  position:fixed;
  inset: 0;
  z-index:10;
  background-color: #0e1316;
  border-radius:5px;
  border:1px solid #80d4d6;
}
.content{
  padding:6%;
  display:flex;
  justify-content:center;
  flex-direction: column;
  align-items: center;
}
#btn-close{
  border:none;
  background:none;
}
.text{
  padding:4%;
}
#modal-text{
  margin-bottom:5%;
}
.input-container {
            display: flex;
            justify-content: center;
            width: 100%;
            gap:5%;
           
        }
        .input-part {
         width:18%;
         height:10vh;
         background:none;
         border:2px solid #929696;
         border-radius: 15px !important;
         font-size: 15px;
         padding:1%;
         text-align: center;

        }
        .input-part:first-child {
          border-radius:5%;
        }
        .input-part:last-child {
          border-radius:5%;

        }
@media (max-width: 768px) {
  .field {
    width: 85%;
  }
}
</style>

