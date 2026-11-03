<template>
    <section aria-labelledby="photos-title">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-500 mx-auto">
            <div v-for="photo in photos" :key="photo.id">
                <img
                    :src="photo.photoUrl"
                    class="w-full object-contain sm:aspect-square"
                    decoding="async"
                    loading="lazy"
                >
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { usePhotos } from '@/composables/usePhotos.ts'

const {
    photos,
    loadGallery
} = usePhotos()


onMounted(() => (
    loadGallery()
))
</script>

<i18n locale="ru-RU">
{
    "title": "Фото",
    "mountainPeaks": "Острые горные вершины в утренней дымке",
    "desert": "Скалы среди песчаной пустыни",
    "nightMountains": "Звёздное небо над горными вершинами",
    "mistyMountains": "Облака между тёмными горными склонами",
    "lizard": "Ящерица на поваленном дереве",
    "shoreline": "Деревянные столбы в спокойной воде в сумерках",
    "bird": "Птица на ветке среди зелёных листьев",
    "icyPeak": "Птицы на голубой ледяной скале",
    "mountainRange": "Снежный горный хребет на фоне вечернего неба"
}
</i18n>

<i18n locale="en-GB">
{
    "title": "Photos",
    "mountainPeaks": "Jagged mountain peaks in the morning haze",
    "desert": "Rock formations in a sandy desert",
    "nightMountains": "A starry sky above mountain peaks",
    "mistyMountains": "Clouds between dark mountain slopes",
    "lizard": "A lizard on a fallen tree",
    "shoreline": "Wooden posts in calm water at dusk",
    "bird": "A bird perched among green leaves",
    "icyPeak": "Birds on a blue ice cliff",
    "mountainRange": "A snowy mountain range beneath the evening sky"
}
</i18n>
