<script setup>
defineProps(['achievement'])
</script>

<template>
  <div class="achievement">
    <div class="header">
      <img :src="'http://achieve.by:5000/' + achievement.logoURL" />
    </div>
    <div class="body">
      <div class="up">
        <div class="start">
          <p class="title">{{ achievement.title }}</p>
          <div class="xp-chip">
            <span v-if="achievement.completionCount > 0">{{ achievement.completionCount }} × </span>
            <span>{{ achievement.xp }}XP</span>
          </div>
        </div>
        <div class="end">
          <div class="percentage">
            <span class="value">{{ achievement.completionRatio }}</span>
            <img src="../assets/img/percent.svg" class="percent-icon" />
            <img src="../assets/img/users.svg" class="user-icon" />
          </div>
        </div>
      </div>
      <div class="center">
        <p>{{ achievement.description }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.achievement {
  display: flex;
  border-radius: 10px;
  margin: 15px 5% 15px 5%;
  padding: 10px;
  background-color: #151e1d;
  box-shadow: 0px 0px 15px 4px #151e1d;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5vw;
}

.header img {
  width: 100px;
  height: 100px;
}

.body {
  width: 100%;
}

.body .up {
  display: flex;
  justify-content: space-between;
}

.body .up .start {
  display: flex;
  align-items: center;
}

.body .up .start .title {
  font-weight: bold;
  font-size: 14pt;
}

.body .up .start .xp-chip {
  border-radius: 7px;
  margin: 10px;
  padding: 5px;
  font-weight: bold;
  color: white;
  background-color: indianred;
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
