<template>
  <div class="slide">
    <div class="icon">
      <slot name="icon" />
    </div>
    <h3 class="title">
      <slot name="title" />
    </h3>
    <div class="content">
      <slot name="content" />
    </div>
  </div>
</template>
<style scoped>
.slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 10px 20px 10px 20px;
}

.icon {
  font-size: 40pt;
  line-height: 70pt;
}

.title {
  font-size: 18pt;
}

.content {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 5px;
  list-style-position: inside;
  max-width: 500px;
}
</style>
