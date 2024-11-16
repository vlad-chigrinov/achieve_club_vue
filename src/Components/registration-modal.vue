<template>
<div class="container" @click.self="close">
        <br>
        <div class="content">
          <div id="sms-modal-text">
            <p style="text-align: center;" class="modal-text">Подтверждение адреса</p>
            <p style="text-align: center;" class="modal-text"> электронной почты</p>
            <p style="text-align: center;" class="modal-text">Вы получили код по электронной почте</p>
            <p style="text-align: center;" class="modal-text">{{Account.emailAddress}}</p>
          </div>
          <div class="input-container">
            <input :ref="input.inputPart1" type="text" class="input-part" maxlength="1" v-model="input.inputPart1"  @input="moveFocus($event, length1)" />


            <input :ref="input.inputPart2" type="text" class="input-part"
             maxlength="1" v-model="input.inputPart2" 
              @input="moveFocus($event, length2)"  />


            <input :ref="input.inputPart3" type="text" class="input-part" 
            maxlength="1" v-model="input.inputPart3"  @input="moveFocus($event, length3)"   />


            <input :ref="input.inputPart4" type="text" class="input-part" 
            maxlength="1" 
            v-model="input.inputPart4"  @input="moveFocus($event, length4)"  />
          </div>
          <div class="errors" v-if="input.inputPart1 == '' || input.inputPart2 == '' || input.inputPart3 == '' || input.inputPart4 == ''">
            <p class="error">Введите код</p>
          </div>
          <button v-else class="login-button1" @click="proofRegisterCode">Отправить</button>
        </div>
      </div>
</template>
<script setup>
import {ref,defineProps} from 'vue'
import { useRouter } from 'vue-router'
defineProps({
    account:Object,
    inputs:Object,
})
const router = useRouter()
let length1 = ref('');
let length2 = ref('');
let length3 = ref('');
let length4 = ref('');
let input = ref({
    inputPart1:'',
    inputPart2:'',
    inputPart3:'',
    inputPart4:''
})
function close(){
    this.$emit('close')
}
const proofCodeError = ref('')
const Account = ref({
    firstName:'',
    lastName:'',
    emailAddress:'',
    clubId:1,
    avatarURL:'',
    password:'',
    proofCode:''

})

const proofRegisterCode = async () => {
  console.log('proof-login');
 

  Account.value.proofCode = input.value.inputPart1 + input.value.inputPart2 + input.value.inputPart3 + input.value.inputPart4;
      let responce1 = await fetch('https://achieve.by:5000/api/email/validate_code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({emailAddress:Account.value.emailAddress,proofcode:Number(Account.value.proofCode)})
      })
      if (responce1.ok) {
        let responce2 = await fetch('https://achieve.by:5000/api/auth/registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(Account)
        })
        if (responce2.ok) {
          router.push('/')
        }
        if(responce2.value == 400){
          console.log(Account.value.proofCode);
          proofCodeError.value = 'Неверный код'
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
}
</script>
<style scoped>

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
.errors{
    color:red;
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