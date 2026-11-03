import type { GalleryResponse } from '@/api'
import type { Photos } from '@/types'

import { ref } from 'vue'

import { useId } from 'vue'

import { galleryApi, HttpError } from '@/api'

const mapGallery = (data: GalleryResponse): Photos[] | null =>
    data.photos ? data.photos.map((photo) => ({
        id: useId(),
        photoUrl: photo
    })).slice(1) : null

export const usePhotos = () => {
    const photos = ref<Photos[] | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const loadGallery = async () => {
        isLoading.value = true
        error.value = null

        try {
            const data = await galleryApi.getGallery()

            photos.value = mapGallery(data)
        } catch (e) {
            if (e instanceof  HttpError) {
                console.error('Ошибка запроса http', e.status)
            }

            console.error('Не удалось загрузить данные', e)

            error.value = e instanceof HttpError ? `HTTP ${e.status}` : 'gallery-load-failed'
        } finally {
            isLoading.value = false
        }
    }

    return {
        photos,
        error,
        isLoading,
        loadGallery
    }
}


