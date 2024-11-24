<template>
<div class="container">
    <p id="modal-text">Код для подверждения уже был отправлен на почту</p>
    <p id="modal-text">{{this.email}}</p>
    <div class="buttons">
        <button class="login-button1" @click="open">Ввести</button>
        <button class="login-button1" @click="close">Отмена</button>
    </div>
</div>
</template>
<script>
export default{
    props:{
        email:{
            type:String,
            required:true
        }
    },
    data(){
        return{
            isModalOpen:false
        }
    },
    methods:{
        close(){
            this.$emit('close');
        },
        open(){
            this.$emit('open');
        }
    }
}
</script>
<style scoped>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}
.container{
    width:40%;
    max-height:30%;
    z-index:99999999999;
    background-color: aqua;
    margin:0 auto;
    display:flex;
    justify-content: center;
    flex-direction: column;
    overflow:visible;
}
#modal-text{
    text-align: center;
    font-size: 100%;
    padding:5%;
}
.buttons{
    display:flex;
    justify-content: space-around;
}
.login-button1 {
  text-align: center;
  color: #80d4d6;
  font-size: 1.0rem;
  font-weight: bold;
  padding: 10px 30px 10px 30px;
  background-color: #151e1d;
  border: 0;
  border-radius: 20px;
  cursor: pointer;
}
</style>