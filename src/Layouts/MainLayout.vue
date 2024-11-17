<script setup>
import { defineProps } from 'vue'

defineProps({
  tab: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <slot></slot>
  <footer>
    <div id="menu">
      <a class="menu-item" :class="{ selected: tab == 1 }" href="/">
        <i class="icon-image fa-solid fa-user"></i>
        <h3>Профиль</h3>
      </a>
      <a class="menu-item" :class="{ selected: tab == 2 }" href="/topusers">
        <i class="icon-image fa-solid fa-users"></i>
        <h3>Топ 100</h3>
      </a>
      <a class="menu-item" :class="{ selected: tab == 3 }" href="/info">
        <i class="icon-image fa-solid fa-circle-info"></i>
        <h3>Инфо</h3>
      </a>
    </div>
  </footer>
</template>
<style scoped>
#menu {
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: fixed;
  bottom: 0dvh;
  width: 100%;
  background-color: var(--background);
  padding: 10px;
}

.menu-item {
  margin: 0 10px 0 10px;
  text-align: center;
  padding: 10px;
  color: var(--secondary);
}

.selected {
  color: var(--primary);
}

.icon-image {
  background-color: var(--secondary);
  color: var(--on-secondary);
  padding: 7px 30px;
  border-radius: 16px;
}

.selected .icon-image {
  background-color: var(--primary);
  color: var(--on-primary);
}
</style>
