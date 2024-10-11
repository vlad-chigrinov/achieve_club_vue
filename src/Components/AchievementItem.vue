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
        <img :src="'http://achieve.by:5000/' + achievement.logoURL" />
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
  background-color: indianred;
  width: 100%;
  text-align: center;
  padding-top: 3px;
  padding-bottom: 4px;
}
.card {
  display: flex;
  width: 100%;
  background-color: #151e1d;
  border-radius: 0 0 10px 10px;
}

.card-top {
  border-radius: 10px 10px 0 0;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5vw;
}

.logo img {
  width: 100px;
  height: 100px;
}

.content {
  width: 100%;
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
  color: white;
  border: 3px solid indianred;
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
