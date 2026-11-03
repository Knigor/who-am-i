import type { Photos } from '@/types'

import { cleanup, render, screen, waitFor } from '@testing-library/vue'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ref } from 'vue'

import PhotoView from '@/pages/PhotoView.vue'

import { usePhotos } from '@/composables/usePhotos.ts'

vi.mock('@/composables/usePhotos.ts', () => ({ usePhotos: vi.fn() }))

function createGallery() {
    const photos = ref<Photos[] | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)
    const loadGallery = vi.fn<() => Promise<void>>()

    vi.mocked(usePhotos).mockReturnValue({ photos, isLoading, error, loadGallery })

    return { photos, loadGallery }
}

describe('PhotoView', () => {
    beforeEach(() => {
        vi.mocked(usePhotos).mockReset()
    })

    afterEach(() => {
        cleanup()
    })

    test('запрашивает галерею при открытии и показывает полученные фотографии', async () => {
        const { photos, loadGallery } = createGallery()
        const gallery = [
            { id: 'mountain', photoUrl: 'https://photos.example.test/mountain.jpg' },
            { id: 'forest', photoUrl: 'https://photos.example.test/forest.jpg' },
        ]
        let completeLoad = () => {}
        loadGallery.mockImplementation(() => new Promise<void>((resolve) => {
            completeLoad = () => {
                photos.value = gallery
                resolve()
            }
        }))

        render(PhotoView)

        expect(screen.queryAllByRole('img')).toHaveLength(0)
        expect(loadGallery).toHaveBeenCalledTimes(1)
        completeLoad()

        const images = await screen.findAllByRole('img')
        expect(images.map(image => image.getAttribute('src'))).toEqual(gallery.map(photo => photo.photoUrl))
        for (const image of images) {
            expect(image.getAttribute('loading')).toBe('lazy')
            expect(image.getAttribute('decoding')).toBe('async')
        }
    })

    test('не создаёт изображения для пустой галереи', async () => {
        const { photos, loadGallery } = createGallery()
        loadGallery.mockImplementation(async () => { photos.value = [] })

        render(PhotoView)

        await waitFor(() => expect(loadGallery).toHaveBeenCalledTimes(1))
        expect(screen.queryAllByRole('img')).toHaveLength(0)
    })
})
