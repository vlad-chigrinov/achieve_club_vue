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
      <div class="users-list" v-if="users.length > 0">
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
            <p class="xp">{{ user.xpSum }} <span class="xp-help">XP</span></p>
          </div>
          <div class="right">
            <p class="position">#{{ idx + 1 }}</p>
          </div>
        </a>
      </div>
      <div v-else class="loading">
        <div class="loader"></div>
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

.xp-help {
  color: var(--secondary);
}

.position {
  font-weight: bold;
  font-size: 24px;
  margin-right: 10px;
}

/* PAGE LOADER */
.loading {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 30%;
}

.loader {
  width: var(--size);
  aspect-ratio: 1;
  position: relative;
  --distance: 100px;
  --size: 50px;
  --color: var(--primary);
}
.loader::before,
.loader::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--color);
}
.loader::before {
  box-shadow: var(--color) calc(var(--distance) * -1) 0;
  animation: l8-1 1s infinite linear;
}
.loader::after {
  transform: rotate(0deg) translateX(var(--distance));
  animation: l8-2 1s infinite linear;
}

@keyframes l8-1 {
  100% {
    transform: translateX(var(--distance));
  }
}
@keyframes l8-2 {
  100% {
    transform: rotate(-180deg) translateX(var(--distance));
  }
}
</style>
