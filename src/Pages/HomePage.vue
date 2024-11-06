<script setup>
import { ref, onMounted, computed } from 'vue'
import AchievementItem from '../Components/AchievementItem.vue'
import MainLoyout from '../Layouts/MainLayout.vue'
import { useAuthStore } from '../Stores/AuthStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const achievements = ref([])
const userInfo = ref()

const currentPage = ref('noncompleted')

onMounted(async () => {
  if ((await authStore.tryAuth()) == false) {
    router.push('/login')
    return
  }

  const requestOptions = { headers: { Authorization: 'Bearer ' + authStore.authToken } }
  let responce = await fetch('https://achieve.by:5000/api/users/current', requestOptions)
  userInfo.value = await responce.json()

  responce = await fetch('https://achieve.by:5000/api/achievements')
  achievements.value = await responce.json()
  achievements.value.sort((a, b) => a.xp > b.xp)

  responce = await fetch(
    'https://achieve.by:5000/api/completedAchievements/current',
    requestOptions
  )
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
  <main-loyout>
    <template v-if="userInfo">
      <header>
        <div class="line-wrapper">
          <button @click="Logout" id="exit-button" class="icon-button">
            <i class="icon-image mirror fa-solid fa-right-from-bracket"></i>
          </button>
          <img
            id="user-avatar"
            :src="'https://achieve.by:5000/' + userInfo.avatar"
            alt="User Avatar"
          />
          <button @click="Logout" id="settings-button" class="icon-button">
            <i class="icon-image fa-solid fa-gear"></i>
          </button>
        </div>
        <h1 id="user-name">{{ userInfo.firstName }} {{ userInfo.lastName }}</h1>
      </header>
      <main>
        <div id="info-grid">
          <div class="info-block">
            <i class="info-icon fa-solid fa-sparkles"></i>
            <div class="info-data">
              <p class="info-value">{{ userInfo.xpSum }}</p>
              <p class="info-title">Всего XP</p>
            </div>
          </div>
          <div class="info-block">
            <i class="info-icon fa-solid fa-circles-overlap"></i>
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
            <i class="filter-icon fa-solid fa-cubes-stacked"></i>
            <span class="filter-title"> комбо </span>
            <div class="selected-marker"></div>
          </button>
          <button
            class="filter"
            :class="{ selected: currentPage == 'completed' }"
            @click="currentPage = 'completed'"
          >
            <i class="filter-icon fa-solid fa-circle-check"></i>
            <span class="filter-title"> сделано </span>
            <div class="selected-marker"></div>
          </button>
          <button
            class="filter"
            :class="{ selected: currentPage == 'noncompleted' }"
            @click="currentPage = 'noncompleted'"
          >
            <i class="filter-icon fa-solid fa-circle-xmark"></i>
            <span class="filter-title"> несделано </span>
            <div class="selected-marker"></div>
          </button>
        </div>
        <hr style="color: var(--primary); background-color: var(--primary)" />
        <div class="achievement-list">
          <template v-if="currentPage == 'kombo'">
            <achievement-item
              v-for="achievement in comboAchievements"
              :key="achievement.Id"
              :achievement="achievement"
            />
          </template>
          <template v-else-if="currentPage == 'completed'">
            <template v-if="completedAchievements.length != 0">
              <achievement-item
                v-for="achievement in completedAchievements"
                :key="achievement.Id"
                :achievement="achievement"
              />
            </template>
            <div v-else class="empty-hero">
              <i class="fa-solid fa-dolly-empty"></i>
              <h3>Начни выполнять достижения!</h3>
              <p>
                Тут отображаются все твои выволненные достижения, чтобы тут что-то появилось -
                выполни любое достижение.
              </p>
            </div>
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
  </main-loyout>
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
  font-size: 25pt;
  color: var(--primary);
}

.mirror {
  transform: rotate(0.5turn);
}

#user-avatar {
  margin-top: 25px;
  width: 170px;
  border-radius: 50%;
  box-shadow: 0 0 9px 0.1px var(--shadow);
}

#user-name {
  font-size: 22pt;
  line-height: 30pt;
  text-align: center;
  font-weight: bold;
  color: var(--primary);
}

#info-grid {
  display: grid;
  margin: 10px 10px 20px 10px;
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
  background-color: var(--tertiary);
  color: var(--on-tertiary);
  border-radius: 15px;
  padding: 7px;
  display: flex;
  align-items: center;
  box-shadow: inset 0 0 4px 0.1px var(--inverse-shadow);
}

.info-icon {
  background-color: var(--secondary);
  color: var(--on-secondary);
  font-size: 20pt;
  line-height: 38pt;
  text-align: center;
  width: 50px;
  height: 50px;
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
  background-color: var(--background);
}

.filter {
  border: none;
  background: none;
  color: var(--secondary);
  cursor: pointer;
}

.selected {
  color: var(--primary);
}

.filter .filter-icon {
  font-size: 18px;
}

.filter .filter-title {
  font-size: 17px;
}

.selected-marker {
  width: 100%;
  margin-top: 10px;
  height: 5px;
  border-radius: 20px 20px 0 0;
}

.selected .selected-marker {
  background-color: var(--primary);
}

.achievement-list {
  margin-bottom: 100px;
}

.empty-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  background-color: var(--tertiary);
  color: var(--on-tertiary);
  border-radius: 15px;
  padding: 10px;
}

.empty-hero i {
  font-size: 65px;
  margin: 3px;
}

.empty-hero h3 {
  font-size: 18px;
}

.empty-hero p {
  font-size: 14px;
}
</style>
