<script setup>
import { ref, onMounted, computed } from 'vue'
import AchievementItem from '../Components/AchievementItem.vue'
import { useAuthStore } from '../Stores/AuthStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const achievements = ref([])
const userInfo = ref()

const currentPage = ref()

onMounted(async () => {
  if ((await authStore.tryAuth()) == false) {
    router.push('/login')
    return
  }

  const requestOptions = { headers: { Authorization: 'Bearer ' + authStore.authToken } }
  let responce = await fetch('/api/users/current', requestOptions)
  userInfo.value = await responce.json()

  responce = await fetch('/api/achievements')
  achievements.value = await responce.json()

  responce = await fetch('/api/completedAchievements/current', requestOptions)
  const completed = await responce.json()
  for (const ca of completed) {
    var finded = achievements.value.find((a) => a.id == ca.achieveId)
    if (finded) {
      finded.completionCount = ca.completionCount
      finded.completed = true
    }
  }
})

function Logout() {
  authStore.logout()
  router.push('/login')
}

const completedAchievements = computed(() =>
  achievements.value.filter((a) => a.completed && a.isMultiple == false)
)

const nonCompletedAchievements = computed(() =>
  achievements.value.filter((a) => a.completed != true && a.isMultiple == false)
)

const comboAchievements = computed(() =>
  achievements.value
    .filter((a) => a.isMultiple)
    .sort((a, b) => a.completionCount > b.completionCount)
)

const achievementsCount = computed(() => achievements.value.length)
const completedCount = computed(() => completedAchievements.value.length)
</script>
<template>
  <template v-if="userInfo">
    <header>
      <div class="line-wrapper">
        <button @click="Logout" id="exit-button" class="icon-button">
          <span id="logout-image" class="icon-image material-symbols-outlined">logout</span>
        </button>
        <img
          id="user-avatar"
          :src="'http://achieve.by:5000/' + userInfo.avatar"
          alt="User Avatar"
        />
        <button @click="Logout" id="settings-button" class="icon-button">
          <span id="settings-image" class="icon-image material-symbols-outlined">settings</span>
        </button>
      </div>
      <h1 id="user-name">{{ userInfo.firstName }} {{ userInfo.lastName }}</h1>
    </header>
    <main>
      <div id="info-grid">
        <div class="info-block">
          <span class="info-icon material-symbols-outlined">social_leaderboard</span>
          <div class="info-data">
            <p class="info-value">{{ userInfo.xpSum }}</p>
            <p class="info-title">Всего XP</p>
          </div>
        </div>
        <div class="info-block">
          <span class="info-icon material-symbols-outlined">star_half</span>
          <div class="info-data">
            <p class="info-value">{{ completedCount }} из {{ achievementsCount }}</p>
            <p class="info-title">Заданий выполнено</p>
          </div>
        </div>
        <div class="info-block">
          <span class="info-icon material-symbols-outlined">star_half</span>
          <div class="info-data">
            <p class="info-value">{{ completedCount }} из {{ achievementsCount }}</p>
            <p class="info-title">Заданий выполнено</p>
          </div>
        </div>
      </div>
      <div id="filters">
        <button
          class="filter"
          :class="{ selected: currentPage == 'kombo' }"
          @click="currentPage = 'kombo'"
        >
          комбо
        </button>
        <button
          class="filter"
          :class="{ selected: currentPage == 'completed' }"
          @click="currentPage = 'completed'"
        >
          сделано
        </button>
        <button
          class="filter"
          :class="{ selected: currentPage == 'noncompleted' }"
          @click="currentPage = 'noncompleted'"
        >
          несделано
        </button>
      </div>
      <div class="achievement-list">
        <template v-if="currentPage == 'kombo'">
          <achievement-item
            v-for="achievement in comboAchievements"
            :key="achievement.Id"
            :achievement="achievement"
          />
        </template>
        <template v-else-if="currentPage == 'completed'">
          <achievement-item
            v-for="achievement in completedAchievements"
            :key="achievement.Id"
            :achievement="achievement"
          />
        </template>
        <template v-else>
          <achievement-item
            v-for="achievement in nonCompletedAchievements"
            :key="achievement.Id"
            :achievement="achievement"
          />
        </template>
      </div>
    </main>
  </template>
</template>
<style scoped>
.line-wrapper {
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
}

.icon-button {
  border: 0;
  background-color: transparent;
  margin: 20px;
  cursor: pointer;
}

.icon-image {
  font-variation-settings: 'FILL' 1 'OPSZ' 30;
  font-size: 25pt;
  color: var(--secondary);
}

#user-avatar {
  margin-top: 25px;
  width: 170px;
  border-radius: 50%;
  box-shadow: 0 0 9px 0.1px var(--shadow);
}

#user-name {
  font-size: 30pt;
  line-height: 38pt;
  text-align: center;
  font-weight: bold;
}

#info-grid {
  display: grid;
  margin: 20px 10px 20px 10px;
  gap: 12px;
}

@media (max-width: 500px) {
  #info-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (min-width: 500px) {
  #info-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  #info-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.info-block {
  background-color: var(--surface-variant);
  color: var(--on-surface-variant);
  border-radius: 15px;
  padding: 7px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 6px 0.1px var(--shadow);
}

.info-icon {
  background-color: var(--tertiary-container);
  color: var(--on-tertiary-container);
  font-size: 20pt;
  text-align: center;
  padding: 10px;
  border-radius: 50%;
}

.info-data {
  margin-left: 10px;
}

.info-value {
  font-size: 24pt;
  font-weight: bold;
}

#filters {
  display: flex;
  justify-content: space-evenly;
}

.filter {
  font-size: 16pt;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: var(--on-tertiary-container);
  background-color: var(--tertiary-container);
  padding: 7px;
  border-radius: 14px;
}

.selected {
  color: var(--on-primary-container);
  background-color: var(--primary-container);
}
</style>
