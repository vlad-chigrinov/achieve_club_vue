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
<div v-show="showModal" class="modal">
    <div class="modal-content">
      <span @click="showModal = false" class="close">&times;</span>
      <h1>на вашу почту {{email}} был отправлен код потверждения</h1>
      <input type="text" name="" id="" v-model="proofCode">
      <button @click="proofLogin">Подтверждение</button>
    </div>
</div>
<main>
    <div id="login-form">
        <div class="field">
            <label class="input-label">Имя</label>
            <input class="input" v-model="name1" type="text" placeholder="Введите имя...">
            <div v-show="name1 == ''">
                <p class="error">Обязательно для заполнения</p>
            </div>
        </div>
        <div class="field">
            <label class="input-label">Фамилия</label>
            <input class="input"  v-model="surname" type="text" placeholder="Введите фамилию...">
            <div v-show="surname == ''">
                <p class="error">Обязательно для заполнения</p>
            </div>        
        </div>
        <div class="field">
            <label class="input-label">E-mail</label>
            <input class="input"  v-model="emailAddress" type="text" placeholder="email@mail.com">
            <div v-show="emailAddress == ''">
                <p class="error">Обязательно для заполнения</p>
            </div>       
         </div>
        <div class="field">
            <label class="input-label" >Пароль</label>
            <input class="input"   v-model="password" type="password" placeholder="•••••••••">
            <div v-show="password == ''">
                <p class="error">Обязательно для заполнения</p>
            </div>        
        </div>
        <div class="field">
            <label class="input-label">Подтверждение пароля</label>
            <input class="input"  v-model="password2" type="password" placeholder="•••••••••">
            <div v-show="password2 == ''">
                <p class="error">Обязательно для заполнения</p>
            </div>        </div>
        <button type="submit" @click="login" id="login-button">Зарегистрироваться</button>
        <div v-show="textError!=''">
            <p>{{textError}}</p>
        </div>
    </div>
</main>

</template>
<script setup>

import { ref} from 'vue'
import { useRouter } from 'vue-router'

// eslint-disable-next-line no-unused-vars
const router = useRouter()
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
const email = ref('')
// eslint-disable-next-line no-unused-vars
const password = ref('')
// eslint-disable-next-line no-unused-vars
const emailAddress = ref('')
// eslint-disable-next-line no-unused-vars
const surname = ref('')
// eslint-disable-next-line no-unused-vars
const clubId = ref(1)
// eslint-disable-next-line no-unused-vars
const password2 = ref('')
// eslint-disable-next-line no-unused-vars
const avatar = ref('StaticFiles/dodge.gif');
// eslint-disable-next-line no-unused-vars
let showModal1 = false;
let textError = ref('');
const name1 = ref('');;
const proofCode = ref('');
let responce;

let Account = ref({
    firstName:name1,
    lastName: surname,
    emailAddres:emailAddress,
    clubId:1,
    avatarUrl:avatar,
    password:password,
    proofCode:proofCode
});

const showModal =  () => {
    showModal1 = true;
}
const proofLogin = async()=>{
    if(responce.ok){
            let responce1 = await fetch('https://achieve.by:5000/api/email/validate_code',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
            },
                 body: JSON.stringify(Account.value.emailAddres,Account.value.proofCode)
            })
            if(responce1.ok){
                let responce2 = await fetch('https://achieve.by:5000/api/auth/registration',{
                    method:'POST',
                    headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                    body: JSON.stringify(Account)
                })
                if(responce2.ok){
                    router.push('/');
                }
            }
        }
        
}
const login = async () => {
    try{
        const res = await fetch('https://achieve.by:5000/api/email/proof_email',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json;charset=utf-8',
                'Accept-Language':'ru'
            },
            body:JSON.stringify(Account.value.emailAddres)
        }) 
        responce = res; 
        showModal();
    } catch(err){
        if(err == 409){
            textError.value = 'Такой пользователь есть уже'
        }
        console.log(err.message);
    }  
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
main{
    margin-bottom:10%;
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
    width: 30%
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
  background-color: rgba(0,0,0,0.4);
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