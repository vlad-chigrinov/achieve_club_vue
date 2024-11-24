<template>
  <header>
    <div id="title">
      <h1>Зарегистрируйтесь</h1>
    </div>
    <div id="subtitle">
      <h3>
        <span style="color:#3d3d3d;">или </span>
        <a href="login">войдите в аккаунт</a>
      </h3>
    </div>
  </header>
  <main>
    <div id="login-form">
      <div class="container__inputs">
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
        <div v-if="doublePasswordError">
          <p class="error">{{doublePasswordError}}</p>
        </div>
      </div>
      <div v-show="textError != ''">
        <p class="error">{{textError}}</p>
      </div>
      <br>
      <button type="submit" @click="sendProofCode" id="login-button" >Зарегистрироваться</button>
    </div>
    </div>
    <div v-if="isModalErrorOpen == true">
      <errormodal @close="closeErrorModal" @open="errorModalWindow" :email="emailAddress"></errormodal>
    </div>
    <div v-if="isVoiceModalOpen == true">
      <regModal :Account="{firstName,lastName,emailAddress,password,clubId,avatarURL}"  @close="ModalClose"></regModal>
    </div>  
  </main>
</template>
<script setup>
import { ref , watch } from 'vue'
import errormodal from '../Components/409-time-out-modal.vue'
import regModal from '../Components/registration-modal.vue'
let isModalErrorOpen = ref(false);

let lastName = ref('');
let firstName = ref('');
let password = ref('');
let emailAddress = ref('');
let avatarURL = ref('StaticFiles/dodge.gif');
let responce = ref('');
let clubId = ref(1);

const isVoiceModalOpen = ref(false);
const password2 = ref('');


  let passwordError=ref()
  let doublePasswordError=ref()
  let emailError=ref()
  let firstNameError=ref()
  let lastNameError=ref()
  
watch(emailAddress, () => {
  emailError.value = ''
})


watch(password, () => {
  passwordError.value = ''
})

watch(firstName,()=>{
  firstNameError.value = ''
})
watch(lastName,()=>{
  lastNameError.value = ''
})
watch(password2,() =>{
 doublePasswordError.value = ''
})



const closeErrorModal = ()=>{
  isModalErrorOpen.value = false;
}
function errorModalWindow(){
  isModalErrorOpen.value = true;
}
function ModalOpen(){
  isVoiceModalOpen.value = true; 
}
function ModalClose(){
  isVoiceModalOpen.value = false;
}


async function sendProofCode (){
  if(validateInputs()){
    responce.value = await fetch('https://achieve.by:5000/api/email/proof_email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept-Language': 'ru'
      },
      body: JSON.stringify(emailAddress.value)
    })
    ModalOpen();
  }
}
 function validateInputs() {
   let result = true
   if(firstName.value.length <=1 ){
    firstNameError.value = 'Имя должно содержать не менее 2 символов'
    isVoiceModalOpen.value = false
  }
   if(lastName.value.length<=4){
    lastNameError.value = 'Имя должно содержать не менее 5 символов'
    isVoiceModalOpen.value = false

  }
   if (emailAddress.value.length == 0) {
     emailError.value = 'Введите почту'
     isVoiceModalOpen.value = false
     result = false
   }
   const emailRegex = /^\S+@\S+\.\S+$/
   if (!emailRegex.test(emailAddress.value)) {
     emailError.value = 'Вы ввели недействительную почту'
     isVoiceModalOpen.value = false
     result = false
   }

   if (password.value
   .length == 0) {
     passwordError.value = 'Введите пароль'
     isVoiceModalOpen.value = false
     result = false
   }

   if (password.value.length < 5) {
     passwordError.value = 'Пароль не должен содержать меньше 6 символов'
     isVoiceModalOpen.value = false
     result = false
   }

   if (!/[A-z]/.test(password.value)) {
     passwordError.value = 'Пароль должен содержать минимум 1 букву'
     isVoiceModalOpen.value = false
     result = false
   }

   if (!/\d/.test(password.value)) {
     passwordError.value = 'Пароль должен содержать минимум 1 цифру'
     isVoiceModalOpen.value = false
     result = false
   }
    if (password.value != password2.value) {
     doublePasswordError.value = 'Пароли должны совпадать'
     isVoiceModalOpen.value = false
     result = false
   }

   return result
}
</script>
<style scoped>
.container__inputs{
  background-color: #272727;
  padding:4%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius:20px;
}
body{
  background-color: #474747;;
}
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
  color: #ffffff;
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
  justify-content: center;
  align-items: center;
}

.input-label {
  color: #ffffff;
  font-size: 10pt;
  display: block;
  margin: 5px;
}

.input {
  font-size: 15pt;
  background-color: #0a0a0a;
  border:0;
  color: #d9dee1;
  border-radius:5px;
  padding: 10px;
  box-shadow: 0 0 6px .1rem #000000;
  width:auto;
}
.input:hover{
  font-size: 15pt;
  background-color: #0a0a0a;
  border:0;
  color: #d9dee1;
  border-radius:5px;
  padding: 10px;
  box-shadow: 0 0 6px .1rem #ffffff;
  width:auto;
}
.input:focus{
  box-shadow: 0 0 6px .1rem #ffffff;
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
  color: #000000;
  font-size: 15pt;
  font-weight: bold;
  padding: 10px 20px 10px 20px;
  background-color: #ffffff;
  border: 0;
  border-radius: 20px;
  cursor: pointer;
  width:100%;
}
.login-button1 {
  
  height:20%;
  text-align: center;
  color: #80d4d6;
  font-size: 1.0rem;
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
  height: 50vh;
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
  max-height:50%;
  margin:0 auto;
  margin-top:10%;
  position:fixed;
  inset: 0;
  z-index:10;
  background-color: #0e1316;
  border-radius:5px;
  border:1px solid #80d4d6;
}
@media(max-width:782px){
  .container{
  max-width:40%;
  max-height:50%;
  margin:0 auto;
  margin-top:20%;
  position:fixed;
  inset: 0;
  z-index:10;
  background-color: #0e1316;
  border-radius:5px;
  border:1px solid #80d4d6;
}
}
@media(max-width:577px){
  .container{
  max-width:50%;
  max-height:50%;
  margin:0 auto;
  margin-top:30%;
  position:fixed;
  inset: 0;
  z-index:10;
  background-color: #0e1316;
  border-radius:5px;
  border:1px solid #80d4d6;
}
  .modal-text{
    font-size: 15px;
    text-align: justify;
  }
}
@media(max-width:410px){
  .container{
  max-width:60%;
  max-height:45%;
  margin:0 auto;
  margin-top:50%;
  position:fixed;
  inset: 0;
  z-index:10;
  background-color: #0e1316;
  border-radius:5px;
  border:1px solid #80d4d6;
}
  .modal-text{
    font-size: 13px;
    text-align: justify;
  }
}
.content{
  padding:4%;
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
         margin-top:15%;

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

