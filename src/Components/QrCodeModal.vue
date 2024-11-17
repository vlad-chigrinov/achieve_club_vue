<script setup>
import { defineEmits, defineProps } from 'vue'
import QrcodeVue from 'qrcode.vue'

defineEmits(['onClose'])

defineProps({
  value: {
    Type: String,
    Required: true
  },
  userInfo: {
    Type: Object,
    Required: true
  },
  achievements: {
    Type: Array,
    Required: true
  }
})
</script>
<template>
  <div class="modal-wrapper" @click.self="$emit('on-close')">
    <div class="modal">
      <div class="user-info">
        <img class="avatar" :src="'https://achieve.by:5000/' + userInfo.avatar" />
        <p class="name">{{ userInfo.firstName }} {{ userInfo.lastName }}</p>
      </div>
      <p class="achieve-count">Достижений: 10</p>
      <div class="achievements">
        <div class="achievement" v-for="achievement in achievements" :key="achievement.Id">
          <img :src="'https://achieve.by:5000/' + achievement.logoURL" />
          <p>{{ achievement.title }}</p>
        </div>
      </div>
      <div class="qr-wrapper">
        <div class="qr">
          <qrcode-vue :size="Number(150)" :value />
        </div>
      </div>
      <p class="help-text">Пожалуйста, покажите QR-код тренеру.</p>
      <div class="close-wrapper">
        <button class="close" @click="$emit('on-close')">Закруть</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  background-color: rgba(128, 128, 128, 0.25);
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  margin: 0 40px 0 40px;
  background-color: var(--background);
  color: var(--primary);
  border: 1px solid var(--outline);
  max-width: 400px;
  min-width: 290px;
}

.user-info {
  display: flex;
  gap: 10px;
  align-items: center;
}

.user-info .avatar {
  border-radius: 50%;
  width: 70px;
  height: 70px;
}

.user-info .name {
  font-size: 14pt;
}

.achieve-count {
  line-height: 30pt;
}

.achievements {
  display: flex;
  overflow: scroll;
  gap: 5px;
}

.achievement {
  background-color: var(--tertiary);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 5px;
  padding: 10px;
  border-radius: 10px;
}

.achievement img {
  width: 60px;
  height: 60px;
  border-radius: 10px;
}

.achievement p {
  font-size: 10pt;
  text-wrap: nowrap;
}

.qr-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr {
  margin: 10px;
  padding: 20px;
  border-radius: 20px;
  background-color: white;
}

.help-text {
  margin: 10px;
}

.close-wrapper {
  display: flex;
  justify-content: center;
}

.close {
  padding: 7px;
  border-radius: 15px;
  font-weight: bold;
  background-color: var(--primary);
  color: var(--on-primary);
}
</style>
