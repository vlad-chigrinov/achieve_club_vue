<script setup>
import { useDark } from '@vueuse/core'

useDark({
  selector: 'body',
  attribute: 'theme',
  valueDark: 'dark',
  valueLight: 'light'
})
</script>
<template>
  <RouterView />
  <div class="px"></div>
  <footer>
    <div id="menu">
      <a class="menu-item" href="/">
        <span class="icon-image material-symbols-outlined">home</span>
        <h3>Профиль</h3>
      </a>
      <a class="menu-item" href="/topusers">
        <span class="icon-image material-symbols-outlined">list</span>
        <h3>Топ 100</h3>
      </a>
      <a class="menu-item" href="/topclubs">
        <span class="icon-image material-symbols-outlined">info</span>
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
  bottom: 0;
  width: 100%;
  background-color: var(--background);
}

.menu-item {
  background-color: var(--surface-variant);
  color: var(--on-surface-variant);
  margin: 0 10px 0 10px;
  text-align: center;
  border-radius: 10px;
  padding: 10px;
}

.icon-image {
  color: var(--primary);
}
</style>
