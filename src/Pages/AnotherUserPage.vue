<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MainLoyout from '../Layouts/MainLayout.vue'
import VueLoadImage from 'vue-load-image'
import AchievementItem from '@/Components/AchievementItem.vue'

const route = useRoute()
const router = useRouter()
const achievements = ref([])
const userInfo = ref()

const completedAchievements = computed(() =>
  achievements.value.filter((a) => a.completed).sort((a, b) => a.xp < b.xp)
)
const completedCount = computed(() => completedAchievements.value.length)
const achievementsCount = computed(() => achievements.value.length)

onMounted(async () => await LoadData())

async function LoadData() {
  let responce = await fetch('https://achieve.by:5000/api/users/' + route.params['id'])
  userInfo.value = await responce.json()

  responce = await fetch('https://achieve.by:5000/api/achievements')
  achievements.value = await responce.json()
  achievements.value
    .sort((a, b) => a.xp > b.xp)
    .map((a) => {
      a.selected = false
      a.completed = false
    })

  responce = await fetch('https://achieve.by:5000/api/completedAchievements/' + route.params['id'])

  const completed = await responce.json()
  for (const ca of completed) {
    var finded = achievements.value.find((a) => a.id == ca.achieveId)
    if (finded) {
      finded.completionCount = ca.completionCount
      finded.completed = true
    }
  }
}

function NavigateBack() {
  router.back()
}
</script>

<template>
  <main-loyout :tab="Number(2)">
    <template v-if="userInfo">
      <header>
        <div class="line-wrapper">
          <button @click="NavigateBack" id="back-button" class="icon-button">
            <i class="icon-image fa-solid fa-chevron-left"></i>
          </button>
          <vue-load-image>
            <template v-slot:image>
              <img class="avatar" :src="'https://achieve.by:5000/' + userInfo.avatar" />
            </template>
            <template v-slot:preloader>
              <i class="avatar avatar-loader fa-solid fa-loader"></i>
            </template>
            <template v-slot:error>
              <i class="avatar avatar-error fa-solid fa-circle-exclamation"></i>
            </template>
          </vue-load-image>
          <div id="spacer" class="icon-button"></div>
        </div>
        <h1 id="user-name">{{ userInfo.firstName }} {{ userInfo.lastName }}</h1>
      </header>
      <main>
        <div id="info-grid">
          <div class="info-block">
            <i class="info-icon fa-solid fa-sparkles"></i>
            <div class="info-data">
              <p class="info-value">{{ userInfo.xpSum }}</p>
              <p class="info-title">{{ $t('userPage.stats.xpSum') }}</p>
            </div>
          </div>
          <div class="info-block">
            <i class="info-icon fa-solid fa-circles-overlap"></i>
            <div class="info-data">
              <p class="info-value">
                {{
                  $t('userPage.stats.achieveCompletedFormat', [completedCount, achievementsCount])
                }}
              </p>
              <p class="info-title">{{ $t('userPage.stats.achieveCompleted') }}</p>
            </div>
          </div>
        </div>
        <hr style="color: var(--primary); background-color: var(--primary)" />
        <div class="achievement-list">
          <template v-if="completedAchievements.length != 0">
            <h3 class="achievements-title">{{ $t('userPage.completedAchievementsTitle') }}</h3>
            <achievement-item
              v-for="achievement in completedAchievements"
              :key="achievement.Id"
              :achievement="achievement"
            />
          </template>
          <div v-else class="empty-hero">
            <i class="fa-solid fa-dolly-empty"></i>
            <h3>{{ $t('userPage.emptyCompletedHero.title') }}</h3>
            <p>{{ $t('userPage.emptyCompletedHero.content', { userName: userInfo.firstName }) }}</p>
          </div>
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
  width: 33px;
  cursor: pointer;
}

.icon-image {
  font-size: 25pt;
  color: var(--primary);
}

.avatar {
  margin-top: 25px;
  width: 170px;
  height: 170px;
  border-radius: 50%;
  box-shadow: 0 0 9px 0.1px var(--shadow);
}

.avatar-loader {
  text-align: center;
  font-size: 150px;
  line-height: 170px;
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

.avatar-error {
  text-align: center;
  font-size: 150px;
  line-height: 170px;
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

.achievements-title {
  color: var(--primary);
  font-size: 16pt;
}

.achievement-list {
  margin: 10px 10px 100px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media (min-width: 500px) {
  .achievement-list {
    margin: 15px 15px 100px 15px;
  }
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
  gap: 10px;
}

.empty-hero i {
  font-size: 65px;
}

.empty-hero h3 {
  font-size: 18px;
}

.empty-hero p {
  font-size: 14px;
}
</style>
