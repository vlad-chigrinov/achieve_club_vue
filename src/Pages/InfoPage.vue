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
      <swiper :navigation="true" :pagination="true" :modules="[Pagination, Navigation]">
        <swiper-slide>
          <info-card>
            <template #icon>
              <i class="fa-solid fa-qrcode fa-2xl"></i>
            </template>
            <template #title> {{ $t('infoPage.card1.title') }} </template>
            <template #content>
              <p>{{ $t('infoPage.card1.subTitle') }}</p>
              <ul>
                <li>{{ $t('infoPage.card1.point1') }}</li>
                <li>{{ $t('infoPage.card1.point2') }}</li>
                <li>{{ $t('infoPage.card1.point3') }}</li>
              </ul>
            </template>
          </info-card>
        </swiper-slide>
        <swiper-slide>
          <info-card>
            <template #icon>
              <i class="fa-regular fa-sparkles fa-2xl"></i>
            </template>
            <template #title> {{ $t('infoPage.card2.title') }} </template>
            <template #content>
              <div style="text-align: center">
                <p>{{ $t('infoPage.card2.point1') }}</p>
                <i class="fa-solid fa-arrow-down"></i>
                <p>{{ $t('infoPage.card2.point2') }}</p>
                <i class="fa-solid fa-arrow-down"></i>
                <p>{{ $t('infoPage.card2.point3') }}</p>
              </div>
            </template>
          </info-card>
        </swiper-slide>
        <swiper-slide>
          <info-card>
            <template #icon>
              <i class="fa-solid fa-cubes-stacked fa-2xl"></i>
            </template>
            <template #title> {{ $t('infoPage.card3.title') }} </template>
            <template #content>
              <p>
                {{ $t('infoPage.card3.point1') }}
              </p>
              <p>
                <i>
                  {{ $t('infoPage.card3.point2') }}
                </i>
              </p>
            </template>
          </info-card>
        </swiper-slide>
        <swiper-slide>
          <info-card>
            <template #icon>
              <i class="fa-solid fa-users fa-2xl"></i>
            </template>
            <template #title> {{ $t('infoPage.card4.title') }} </template>
            <template #content>
              <p>{{ $t('infoPage.card4.point1') }}</p>
              <p>
                <i> {{ $t('infoPage.card4.point2') }}</i>
                &nbsp;
                <i class="fa-solid fa-message-smile"></i>
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
  --swiper-navigation-top-offset: 97%;
  --swiper-pagination-bullet-inactive-color: var(--on-secondary);
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
<style>
.swiper > .swiper-pagination {
  z-index: -10 !important;
}
</style>
