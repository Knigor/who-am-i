export type GalleryResponse = {
    photos: string[]
}

export interface GalleryApiClientInterface {
    getGallery(signal?: AbortSignal): Promise<GalleryResponse>
}

const galleryBaseUrl = import.meta.env.VITE_GALLERY_BASE_URL

if (!galleryBaseUrl) {
    throw new Error('VITE_GALLERY_BASE_URL is not configured')
}

export class HttpError extends Error {
    readonly status: number

    constructor(status: number, statusText: string) {
        super(`HTTP ${status}: ${statusText}`)

        this.name = 'HttpError'
        this.status = status
    }
}

export class GalleryApiClient implements GalleryApiClientInterface {
    private readonly baseUrl: URL

    constructor(baseUrl: string) {
        this.baseUrl = new URL(baseUrl)
    }

    private async makeRequest<T>(
        path: string,
        options: RequestInit = {},
    ): Promise<T> {
        const url = new URL(path, this.baseUrl)
        const headers = new Headers(options.headers)

        if (!headers.has('Accept')) {
            headers.set('Accept', 'application/json')
        }

        const response = await fetch(url, {
            ...options,
            headers,
        })

        if (!response.ok) {
            throw new HttpError(response.status, response.statusText)
        }

        return response.json()
    }

    getGallery(signal?: AbortSignal): Promise<GalleryResponse> {
        return this.makeRequest<GalleryResponse>('d4e0ktetofllid2c9l3e', { signal })
    }
}

export const galleryApi = new GalleryApiClient(galleryBaseUrl)
