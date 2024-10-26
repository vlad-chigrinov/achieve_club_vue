<template>
  <div class="container">
    <div class="text" style="float:right">
      <button id="btn-close" @click="close">X</button>
    </div>
    <br>
    <div class="content">
      <p align="center">На вашу почту было отправлен код подтверждения</p>
      <input type="text" placeholder="text" class="input">
      <button id="login-button">Подтвердить</button>
    </div>
  </div>
</template>
<script >
export default{
  methods:{
    close(){
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
.input {
  font-size: 15pt;
  background-color: #0e1316;
  border: 0;
  border-bottom: 3px solid #80d4d6;
  color: #d9dee1;
  padding: 5px;
  width: 100%;
  margin-top:5%;
}
#login-button {
  
  width:50%;
  color: #80d4d6;
  font-size: 15pt;
  font-weight: bold;
  padding: 10px 30px 10px 30px;
  background-color: #151e1d;
  border: 0;
  border-radius: 20px;
  cursor: pointer;
  margin-top:5%;
  margin-left:25%;
}
.container{
  width:40%;
  height:40vh;
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
}
#btn-close{
  border:none;
  background:none;
}
.text{
  padding:4%;
}
</style>