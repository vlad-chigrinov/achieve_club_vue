<script setup>
import { ref, onMounted, computed } from 'vue'
import AchievementItem from '../Components/AchievementItem.vue'
import QrCodeModal from '../Components/QrCodeModal.vue'
import SettingsModal from '@/Components/SettingsModal.vue'
import MainLoyout from '../Layouts/MainLayout.vue'
import { useAuthStore } from '../Stores/AuthStore'
import { useRouter } from 'vue-router'
import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr'
import VueLoadImage from 'vue-load-image'
import { useI18n } from 'vue-i18n'
import axios from 'axios'

const i18nLocale = useI18n()
const authStore = useAuthStore()
const router = useRouter()

const achievements = ref([])
const userInfo = ref()

const currentPage = ref('noncompleted')

const showSettingsModal = ref(false)

const showQrModal = ref(false)

const connection = ref(
  new HubConnectionBuilder()
    .withUrl('https://achieve.by:5000/achieve', {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets
    })
    .build()
)

const completeEventName = computed(() => 'completed:' + userInfo.value.id)

const completedAchievements = computed(() =>
  achievements.value.filter((a) => a.completed && a.isMultiple == false)
)

const nonCompletedAchievements = computed(() =>
  achievements.value.filter((a) => a.completed != true && a.isMultiple == false)
)

const comboAchievements = computed(() =>
  achievements.value
    .filter((a) => a.isMultiple)
    .sort((a, b) => b.completionCount - a.completionCount)
)
const achievementsCount = computed(() => achievements.value.length)
const completedCount = computed(() => completedAchievements.value.length)

const showFab = computed(() => selected.value.length > 0)

const selected = computed(() => achievements.value.filter((a) => a.selected))

const qrCoreValue = computed(
  () => userInfo.value.id + ':' + selected.value.map((a) => a.id.toString()).join(':')
)

onMounted(async () => await LoadData())

async function LoadData() {
  if ((await authStore.tryAuth()) == false) {
    router.push('/login')
    return
  }

  let responce = await fetch('https://achieve.by:5000/api/users/' + authStore.getUserId)
  userInfo.value = await responce.json()

  await axios
    .get('https://achieve.by:5000/api/achievements', {
      headers: { 'Accept-Language': i18nLocale.locale.value }
    })
    .then((r) => {
      achievements.value = r.data
      achievements.value
        .sort((a, b) => b.xp - a.xp)
        .map((a) => {
          a.selected = false
          a.completed = false
        })
    })

  responce = await fetch('https://achieve.by:5000/api/completedAchievements/' + authStore.getUserId)
  const completed = await responce.json()
  for (const ca of completed) {
    var finded = achievements.value.find((a) => a.id == ca.achieveId)
    if (finded) {
      finded.completionCount = ca.completionCount
      finded.completed = true
    }
  }
}

function Logout() {
  authStore.logout()
  router.push('/login')
}

async function OpenModal() {
  await connection.value.start().then(() => {
    console.log('signalr connected')
    connection.value.on(completeEventName.value, () => {
      OnModalSubmit()
    })
    console.log('signalr subscribed ' + completeEventName.value)
    showQrModal.value = true
  })
}

async function OnModalSubmit() {
  console.log('on ' + completeEventName.value)
  showQrModal.value = false
  await connection.value.stop().then(() => console.log('signalr disconnected'))
  await LoadData()
}

async function CloseModal() {
  console.log('close')
  await connection.value.stop().then(() => console.log('signalr disconnected'))
  showQrModal.value = false
}

function SelectAchievement(achievement) {
  if (achievement.selected == true) {
    achievement.selected = false
    console.log('unselelect')
  } else if (achievement.isMultiple || !achievement.completed) {
    achievement.selected = true
    console.log('select')
  }
}
</script>
<template>
  <qr-code-modal
    v-if="showQrModal"
    @on-close="CloseModal"
    :value="qrCoreValue"
    :userInfo="userInfo"
    :achievements="selected"
  />
  <settings-modal v-if="showSettingsModal" @on-close="showSettingsModal = false" />
  <button class="fab" :class="{ hide: !showFab }" @click="OpenModal">
    <i class="fa-solid fa-qrcode"></i>
  </button>
  <main-loyout :tab="Number(1)">
    <template v-if="userInfo">
      <header>
        <div class="line-wrapper">
          <button @click="Logout" id="exit-button" class="icon-button">
            <i class="icon-image mirror fa-solid fa-right-from-bracket"></i>
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
          <button @click="showSettingsModal = true" id="settings-button" class="icon-button">
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
              <p class="info-title">{{ $t('profile.stats.xpSum') }}</p>
            </div>
          </div>
          <div class="info-block">
            <i class="info-icon fa-solid fa-circles-overlap"></i>
            <div class="info-data">
              <p class="info-value">
                {{
                  $t('profile.stats.achieveCompletedFormat', [completedCount, achievementsCount])
                }}
              </p>
              <p class="info-title">{{ $t('profile.stats.achieveCompleted') }}</p>
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
            <span class="filter-title"> {{ $t('profile.filters.combo') }} </span>
            <div class="selected-marker"></div>
          </button>
          <button
            class="filter"
            :class="{ selected: currentPage == 'completed' }"
            @click="currentPage = 'completed'"
          >
            <i class="filter-icon fa-solid fa-circle-check"></i>
            <span class="filter-title"> {{ $t('profile.filters.completed') }} </span>
            <div class="selected-marker"></div>
          </button>
          <button
            class="filter"
            :class="{ selected: currentPage == 'noncompleted' }"
            @click="currentPage = 'noncompleted'"
          >
            <i class="filter-icon fa-solid fa-circle-xmark"></i>
            <span class="filter-title"> {{ $t('profile.filters.nonCompleted') }} </span>
            <div class="selected-marker"></div>
          </button>
        </div>
        <hr style="color: var(--primary); background-color: var(--primary)" />
        <div class="achievement-list">
          <template v-if="currentPage == 'kombo'">
            <achievement-item
              @click="SelectAchievement(achievement)"
              v-for="achievement in comboAchievements"
              :key="achievement.Id"
              :achievement="achievement"
            />
          </template>
          <template v-else-if="currentPage == 'completed'">
            <template v-if="completedAchievements.length != 0">
              <achievement-item
                @click="SelectAchievement(achievement)"
                v-for="achievement in completedAchievements"
                :key="achievement.Id"
                :achievement="achievement"
              />
            </template>
            <div v-else class="empty-hero">
              <i class="fa-solid fa-dolly-empty"></i>
              <h3>{{ $t('profile.emptyCompletedHero.title') }}</h3>
              <p>
                {{ $t('profile.emptyCompletedHero.content') }}
              </p>
            </div>
          </template>
          <template v-else>
            <achievement-item
              @click="SelectAchievement(achievement)"
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
.fab {
  position: fixed;
  bottom: 100px;
  right: 0;
  margin: 20px;
  background-color: var(--primary);
  color: var(--on-primary);
  padding: 10px;
  font-size: 25pt;
  border-radius: 20px;
}

.fab.hide {
  visibility: hidden;
}

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
  margin-right: 4px;
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
  text-align: center;
}

.empty-hero p {
  font-size: 16px;
}
</style>
