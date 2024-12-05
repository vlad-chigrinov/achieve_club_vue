<script setup>
import { defineEmits } from 'vue'

defineEmits(['on-close'])
</script>

<template>
  <div class="modal-wrapper" @click.self="$emit('on-close')">
    <div class="modal">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.modal-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  background-color: var(--opacity-background);
}

.modal {
  padding: 20px;
  border-radius: 20px;
  margin: 0 40px 0 40px;
  background-color: var(--background);
  color: var(--primary);
  border: 2px solid var(--outline);
  max-width: 400px;
  min-width: 290px;
}
</style>
