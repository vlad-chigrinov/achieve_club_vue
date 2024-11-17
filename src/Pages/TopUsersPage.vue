<script setup>
import { onMounted, ref } from 'vue'
import MainLoyout from '../Layouts/MainLayout.vue'
import axios from 'axios'
import VueLoadImage from 'vue-load-image'

const users = ref([])

onMounted(async () => {
  await axios
    .get('https://achieve.by:5000/api/users')
    .then((f) => (users.value = f.data.sort((a, b) => a.xpSum < b.xpSum)))
    .catch((e) => console.log(e))
})
</script>

<template>
  <main-loyout :tab="Number(2)">
    <header>
      <h1>Топ пользователей</h1>
    </header>
    <main>
      <div class="users-list">
        <a :href="'/users/' + user.id" class="user" v-for="(user, idx) in users" :key="user.id">
          <div class="left">
            <vue-load-image>
              <template v-slot:image>
                <img class="avatar" :src="'https://achieve.by:5000/' + user.avatar" />
              </template>
              <template v-slot:preloader>
                <i class="avatar avatar-loader fa-solid fa-loader"></i>
              </template>
              <template v-slot:error>
                <i class="avatar avatar-error fa-solid fa-circle-exclamation"></i>
              </template>
            </vue-load-image>
          </div>
          <div class="center">
            <p class="name">{{ user.firstName }} {{ user.lastName }}</p>
            <p class="xp">{{ user.xpSum }}</p>
          </div>
          <div class="right">
            <p class="position">#{{ idx + 1 }}</p>
          </div>
        </a>
      </div>
    </main>
  </main-loyout>
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
}

h1 {
  color: var(--primary);
  margin: 15px;
  font-size: 22px;
}

main {
  margin-top: 20px;
}

.users-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 100px;
}

.user {
  text-decoration: none;
  background-color: var(--tertiary);
  color: var(--on-tertiary);
  border-radius: 15px;
  margin: 0 10px 0 10px;
  padding: 7px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.user .avatar {
  width: 55px;
  height: 55px;
  border-radius: 50%;
}

.user .avatar-loader {
  text-align: center;
  font-size: 3em;
  color: var(--primary);
  animation: rotation 1s infinite;
}

@keyframes rotation {
  from🅓 {
    rotate: 0deg;
  }
  to {
    rotate: 180deg;
  }
}

.user .avatar-error {
  text-align: center;
  font-size: 3em;
  color: var(--primary);
  animation: blinking 1s infinite;
}

@keyframes blinking {
  from {
    transform: translateY(-3px);
  }
  75% {
    transform: translateY(6px);
  }
  to {
    transform: translateY(-3px);
  }
}

.user .center {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.name {
  font-size: 14px;
}

.position {
  font-weight: bold;
  font-size: 24px;
  margin-right: 10px;
}
</style>
