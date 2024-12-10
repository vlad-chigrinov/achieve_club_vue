<script setup>
import BaseModal from './BaseModal.vue'
import { defineEmits } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/Stores/AuthStore'
import { useRouter } from 'vue-router'

defineEmits(['on-close'])

const authStore = useAuthStore()
const router = useRouter()

async function OnPickFile(event) {
  if (authStore.isAuth == false) router.push('/login')

  console.log(event.target.files)
  var formData = new FormData()
  formData.append('file', event.target.files[0])
  await axios.post('https://achieve.by:5000/api/avatar', formData, {
    headers: { Authorization: 'Bearer ' + authStore.authToken }
  })
}
</script>

<template>
  <base-modal @on-close="$emit('on-close')">
    <div class="title-wrapper">
      <h3>Настройки</h3>
      <button @click="$emit('on-close')" class="close-button">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <div class="file">
      <input
        type="file"
        id="file-input"
        accept="image/png, image/jpg, image/jpeg, image/webp, image/bmp, image/gif"
        multiple="false"
        @change="OnPickFile($event)"
      />
      <label for="file-input" id="file-input-label">
        <i class="fa-regular fa-file-arrow-up"></i>
        Выбрать аватарку...
      </label>
    </div>
  </base-modal>
</template>

<style scoped>
.title-wrapper {
  display: flex;
  align-items: center;
  gap: 5px;
}

.close-button {
  border-radius: 50%;
  width: 27px;
  height: 27px;
  font-size: 20px;
  line-height: 0;
  border: none;
  background-color: var(--primary);
  color: var(--on-primary);
  cursor: pointer;
}

#file-input {
  width: 0.1px;
  height: 0.1px;
  margin-top: 20px;
}

#file-input-label {
  background-color: var(--primary);
  color: var(--on-primary);
  padding: 7px;
  box-shadow: 0 0 3px 0.1rem var(--shadow);
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
}
</style>
