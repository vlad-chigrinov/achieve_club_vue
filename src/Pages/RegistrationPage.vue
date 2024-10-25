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
  <!-- <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span @click="showModal = false" class="close">&times;</span>
      <h1>на вашу почту {{email}} был отправлен код потверждения</h1>
      <input type="text" name="" id="" v-model="proofCode">
      <button @click="proofLogin">Подтверждение</button>
    </div>
</div> -->
  <main>
    <input type="text" v-model="proofCode" />
    <button @click="proofLogin">send</button>

    <div id="login-form">
      <div class="field">
        <label class="input-label">Имя</label>
        <input class="input" v-model="firstName" type="text" placeholder="Введите имя..." />
        <div v-if="firstName.length < 2">
          <p class="error">Обязательно для заполнения</p>
        </div>
      </div>
      <div class="field">
        <label class="input-label">Фамилия</label>
        <input class="input" v-model="lastName" type="text" placeholder="Введите фамилию..." />
        <div v-if="lastName.length < 5">
          <p class="error">Обязательно для заполнения</p>
        </div>
      </div>
      <div class="field">
        <label class="input-label">E-mail</label>
        <input class="input" v-model="emailAddress" type="text" placeholder="email@mail.com" />
        <div v-if="validateEmail">
          <p class="error">Обязательно для заполнения</p>
        </div>
      </div>
      <div class="field">
        <label class="input-label">Пароль</label>
        <input class="input" v-model="password" type="password" placeholder="•••••••••" />
        <div v-if="validatePassword">
          <p class="error">Обязательно для заполнения</p>
        </div>
      </div>
      <div class="field">
        <label class="input-label">Подтверждение пароля</label>
        <input class="input" v-model="password2" type="password" placeholder="•••••••••" />
        <div v-if="password2 == ''">
          <p class="error">Обязательно для заполнения</p>
        </div>
      </div>
      <button type="submit" @click="login" id="login-button">Зарегистрироваться</button>
      <div v-show="textError != ''">
        <p>{{ textError }}</p>
      </div>
    </div>
     <popup v-if="isVoiceModalOpen" @close="isVoiceModalOpen = false"></popup> 
    
    
  </main>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import popup from '../Components/v-pop-up.vue'

const router = useRouter()
const password = ref('')

const emailAddress = ref('')
const isVoiceModalOpen = true;
const lastName = ref('')
const firstName = ref('');
const clubId = 1
const password2 = ref('')
const avatarURL = 'StaticFiles/dodge.gif'
let textError = ref('')
const proofCode = ref('')
let responce = ref('')
const emailError = ref('');
const passwordError = ref('');
function validateEmail(){
  const emailRegex = /^\S+@\S+\.\S+$/
  if (!emailRegex.test(emailAddress.value)) {
    emailError.value = 'Вы ввели недействительную почту'
    
  }
}
function validatePassword(){
  if (password.value.length < 6) {
    passwordError.value = 'Недействительный пароль'
  }

  if (!/[A-z]/.test(password.value)) {
    passwordError.value = 'Недействительный пароль'
  }
}
const proofLogin = async () => {
  console.log(responce.value)
  if (responce.value == "200") {
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
    }
  }
}
const login = async () => {
  const res = await fetch('https://achieve.by:5000/api/email/proof_email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Accept-Language': 'ru'
    },
    body: JSON.stringify(emailAddress.value)
  })
  responce.value = res.status
  //showModal()
}
</script>
<style scoped>
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
@media (max-width: 768px) {
  .field {
    width: 85%;
  }
}
</style>
