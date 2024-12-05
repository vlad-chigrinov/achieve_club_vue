<script setup>
import { defineEmits, defineProps } from 'vue'
import QrcodeVue from 'qrcode.vue'
import BaseModal from './BaseModal.vue'

defineEmits(['on-close'])

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
  <base-modal @on-close="$emit('on-close')">
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
  </base-modal>
</template>

<style scoped>
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
