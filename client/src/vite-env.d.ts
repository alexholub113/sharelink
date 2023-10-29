/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SHARELINK_API_BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}