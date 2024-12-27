<script setup>
import { onMounted, ref } from 'vue'
import MainLoyout from '../Layouts/MainLayout.vue'
import axios from 'axios'
import VueLoadImage from 'vue-load-image'

const users = ref([])

onMounted(async () => {
  users.value = await axios
    .get('api/users')
    .then((f) => f.data.sort((a, b) => b.xpSum - a.xpSum))
    .catch((e) => console.log(e))
})
</script>

<template>
  <main-loyout :tab="Number(2)">
    <header>
      <h1>{{ $t('topUsers.title') }}</h1>
    </header>
    <main>
      <div class="users-list" v-if="users.length > 0">
        <a :href="'/users/' + user.id" class="user" v-for="(user, idx) in users" :key="user.id">
          <div class="left">
            <vue-load-image>
              <template v-slot:image>
                <img class="avatar" :src="axios.defaults.baseURL + user.avatar" />
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
  border-radius: 50%;
  background: var(--color);
  display: grid;
  animation: l22-0 2s infinite linear;
  --size: 50px;
  --color: var(--primary);
}
.loader:before,
.loader:after {
  content: '';
  grid-area: 1/1;
  margin: 15%;
  border-radius: 50%;
  background: inherit;
  transform: rotate(0deg) translate(150%);
  animation: l22 1s infinite;
}
.loader:after {
  animation-delay: -0.5s;
}
@keyframes l22-0 {
  100% {
    transform: rotate(1turn);
  }
}
@keyframes l22 {
  100% {
    transform: rotate(1turn) translate(150%);
  }
}
</style>
