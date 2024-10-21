<script setup>
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
      :class="{ 'card-top': achievement.completionCount }"
      v-if="achievement.isMultiple"
    >
      <span v-if="achievement.completionCount"> Комбо ×{{ achievement.completionCount }} </span>
      <span v-else> Начни комбо! </span>
    </div>
    <div class="card" :class="{ 'card-top': !achievement.completionCount }">
      <div class="logo">
        <img :src="'https://achieve.by:5000/' + achievement.logoURL" />
      </div>
      <div class="content">
        <div class="header">
          <div class="start">
            <p class="title">{{ achievement.title }}</p>
            <div class="xp-chip">
              <span>{{ achievement.xp }}XP</span>
            </div>
          </div>
        </div>
        <div class="center">
          <p>{{ achievement.description }}</p>
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
  margin: 10px;
}
.card-before {
  background-color: var(--tertiary-container);
  color: var(--on-tertiary-container);
  width: 100%;
  text-align: center;
  padding-top: 3px;
  padding-bottom: 4px;
}
.card {
  display: flex;
  width: 100%;
  background-color: var(--surface-container);
  color: var(--on-surface-container);
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}

.card-top {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 7px;
}

.logo img {
  width: 85px;
  height: 85px;
}

.content {
  width: 100%;
  margin-right: 10px;
}

.content .header {
  display: flex;
  justify-content: space-between;
}

.content .header .start {
  display: flex;
  align-items: center;
}

.content .header .start .title {
  font-weight: bold;
  font-size: 14pt;
}

.content .header .start .xp-chip {
  margin: 10px;
  padding: 4px;
  font-weight: bold;
  border: 3px solid var(--surface-tint);
  border-radius: 7px;
}

.percentage {
  display: flex;
  align-items: center;
  justify-content: right;
}

.percentage .value {
  font-size: 18pt;
  font-weight: bold;
}

.percentage .user-icon {
  width: 32px;
  margin-left: 14px;
}

.percentage .percent-icon {
  position: absolute;
  width: 22px;
  transform: translate(-24px, -5px);
}
</style>
