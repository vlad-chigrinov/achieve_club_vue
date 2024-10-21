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
</template>
