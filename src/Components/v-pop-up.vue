<template>
  <div class="container">
    <div class="text" style="float:right">
      <button id="btn-close" @click="close">X</button>
    </div>
    <br>
    <div class="content">
      <input type="text" placeholder="text">
      <button>click</button>
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

.container{
  width:20%;
  height:20vh;
  margin:0 auto;
  margin-top:10%;
  position:fixed;
  inset: 0;
  z-index:10;
  background-color:rgb(255, 0, 0);
}
.content>text{
  padding:6%;
}
#btn-close{
  border:none;
  background:none;
}
</style>