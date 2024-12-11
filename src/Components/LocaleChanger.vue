<script setup>
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

const langs = [
  { key: 'ru', title: 'Русский' },
  { key: 'pl', title: 'Polska' }
]

const currentLocale = ref('ru')

watch(currentLocale, () => {
  localStorage.setItem('lang', currentLocale.value)
  i18n.locale.value = currentLocale.value
})

onMounted(() => {
  currentLocale.value = i18n.locale.value 
})
</script>
<template>
  <div class="locale-changer">
    <i class="fa-solid fa-globe"></i>
    <select v-model="currentLocale">
      <option v-for="lang in langs" :key="lang.key" :value="lang.key">
        {{ lang.title }}
      </option>
    </select>
  </div>
</template>
<style scoped>
select {
  background-color: var(--background);
  border: none;
  font-size: 14pt;
  color: var(--primary);
}

.locale-changer {
  display: flex;
  gap: 5px;
  text-align: center;
  font-size: 14pt;
  color: var(--primary);
  align-items: center;
}
</style>
