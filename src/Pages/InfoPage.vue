<script setup>
import MainLayout from '@/Layouts/MainLayout.vue'
import InfoCard from '@/Components/InfoCard.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
</script>
<template>
  <main-layout :tab="Number(3)">
    <div class="content-wrapper">
      <swiper
        class="corousel"
        :navigation="true"
        :pagination="true"
        :modules="[Pagination, Navigation]"
      >
        <swiper-slide>
          <info-card>
            <template #icon>
              <i class="fa-solid fa-qrcode fa-2xl"></i>
            </template>
            <template #title> Выполнение достижений </template>
            <template #content>
              <p>Чтобы выполнить достижение вам нужно:</p>
              <ul>
                <li>Выбрать желаемое достижение</li>
                <li>Нажать на вспывающую кнопку</li>
                <li>Попросить у тренера просканировать код</li>
              </ul>
            </template>
          </info-card>
        </swiper-slide>
        <swiper-slide>
          <info-card>
            <template #icon>
              <i class="fa-regular fa-star-christmas fa-2xl"></i>
            </template>
            <template #title> Получайте XP за достижения </template>
            <template #content>
              <p>Чем больше достижений</p>
              <i class="fa-solid fa-arrow-down" style="text-align: center"></i>
              <p>Тем больше XP</p>
              <i class="fa-solid fa-arrow-down" style="text-align: center"></i>
              <p>Тем выше вы в топе</p>
            </template>
          </info-card>
        </swiper-slide>
        <swiper-slide>
          <info-card>
            <template #icon>
              <i class="fa-solid fa-sparkles fa-2xl"></i>
            </template>
            <template #title> Комбо-достижения </template>
            <template #content>
              <p>
                Все комбо достижения отображаются во вкладке <b>КОМБО</b>. Их вы можете выполнять
                СКОЛЬКО УГОДКО - и каждый раз получать за это очки.
              </p>
              <p>
                <i>
                  К примеру: если вы выполнили такое достижение 10 раз, то получили в 10 раз больше
                  очков!
                </i>
              </p>
            </template>
          </info-card>
        </swiper-slide>
      </swiper>
    </div>
  </main-layout>
</template>
<style scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  padding-bottom: 100px;
}

.swiper {
  width: 100%;
  height: 100%;
  --swiper-theme-color: var(--primary);
  --swiper-navigation-size: 20pt;
  --swiper-navigation-sides-offset: 20%;
  --swiper-navigation-top-offset: 30%;
}

.swiper-slide {
  color: var(--on-tertiary);
  text-align: center;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
