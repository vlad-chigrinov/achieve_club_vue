<script setup>
import { onMounted, ref } from 'vue'
import MainLoyout from '../Layouts/MainLayout.vue'
import axios from 'axios'

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
        <div class="user" v-for="(user, idx) in users" :key="user.id">
          <div class="left">
            <img class="avatar" :src="'https://achieve.by:5000/' + user.avatar" />
          </div>
          <div class="center">
            <p class="name">{{ user.firstName }} {{ user.lastName }}</p>
            <p class="xp">{{ user.xpSum }}</p>
          </div>
          <div class="right">
            <p class="position">#{{ idx + 1 }}</p>
          </div>
        </div>
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
  background-color: var(--tertiary);
  color: var(--on-tertiary);
  border-radius: 15px;
  margin: 0 10px 0 10px;
  padding: 5px;
  display: flex;
  align-items: center;
  gap: 3px;
}

.user .avatar {
  width: 55px;
  border-radius: 50%;
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
