<script setup>
import VueLoadImage from 'vue-load-image'
defineProps({
  achievement: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="achievement">
    <div
      class="card-before"
      :class="{ 'card-top': achievement.isMultiple }"
      v-if="achievement.isMultiple"
    >
      <span v-if="achievement.completionCount"> Комбо ×{{ achievement.completionCount }} </span>
      <span v-else> Начни комбо! </span>
    </div>
    <div
      class="card"
      :class="{
        'card-top': !achievement.isMultiple,
        selected: achievement.selected
      }"
    >
      <div class="left">
        <vue-load-image>
          <template v-slot:image>
            <img class="logo" :src="'https://achieve.by:5000/' + achievement.logoURL" />
          </template>
          <template v-slot:preloader>
            <i class="logo logo-loader fa-solid fa-loader"></i>
          </template>
          <template v-slot:error>
            <i class="logo logo-error fa-solid fa-circle-exclamation"></i>
          </template>
        </vue-load-image>
      </div>
      <div class="right">
        <div class="header">
          <div class="title">
            <span>{{ achievement.title }}</span>
          </div>
          <div class="xp-chip">
            <span>{{ achievement.xp }}XP</span>
          </div>
        </div>
        <div class="content">
          <span>{{ achievement.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.achievement {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card-before {
  background-color: var(--secondary);
  color: var(--on-secondary);
  width: 100%;
  text-align: center;
  padding-top: 3px;
  padding-bottom: 4px;
}
.card {
  display: flex;
  flex-direction: row;
  gap: 7px;
  padding: 5px;
  width: 100%;
  background-color: var(--tertiary);
  color: var(--on-tertiary);
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}

.card.selected {
  background-color: var(--primary);
  color: var(--on-primary);
}

.card-top {
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}

.left {
  align-self: center;
}

.logo {
  width: 65px;
  height: 65px;
}

.logo-loader {
  text-align: center;
  font-size: 55px;
  line-height: 65px;
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

.logo-error {
  text-align: center;
  font-size: 55px;
  line-height: 65px;
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

.right {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
}

.right .header {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: space-between;
}

.xp-chip {
  padding: 3px;
  font-weight: bold;
  font-size: 9pt;
  border: 1px solid var(--outline);
  border-radius: 8px;
}

.title {
  font-weight: bold;
  font-size: 11pt;
}

.content {
  font-size: 11pt;
}
</style>
