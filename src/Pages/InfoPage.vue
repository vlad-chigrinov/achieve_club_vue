<script setup>
import MainLayout from '@/Layouts/MainLayout.vue'
import InfoCard from '@/Components/InfoCard.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
</script>
<template>
  <main-layout :tab="Number(3)">
    <h1 class="page-title">О приложении</h1>
    <div class="content-wrapper">
      <swiper
        class="corousel"
        :navigation="true"
        :pagination="true"
        :modules="[Navigation, Pagination]"
      >
        <swiper-slide
          ><info-card>
            <template #icon>
              <i class="fa-solid fa-qrcode"></i>
            </template>
            <template #title> Выполнение достижений </template>
            <template #content>
              Чтобы выполнить достижение вам нужно: Выбрать желаемое достижение Нажать на вспывающую
              кнопку
            </template>
          </info-card></swiper-slide
        >
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
      </swiper>
    </div>
  </main-layout>
</template>
<style scoped>
.page-title {
  color: var(--primary);
  font-size: 18pt;
  text-align: center;
  line-height: 40px;
}

.content-wrapper {
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper {
  height: 100%;
  margin: 10px 20px 200px 20px;
  --swiper-theme-color: var(--primary);
  --swiper-navigation-size: 20px;
}

.swiper-slide {
  color: var(--on-tertiary);
  text-align: center;
  font-size: 18px;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
