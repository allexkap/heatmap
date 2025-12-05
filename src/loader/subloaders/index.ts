import type { Component } from 'vue'

export interface LoaderInfo {
    name: string
    displayName: string
    description?: string
    component: Component
}

import DefaultLoader from './DefaultLoader.vue'
import DeckLoader from './DeckLoader.vue'

export const loadersRegistry: LoaderInfo[] = [
    {
        name: 'default',
        displayName: 'Default Loader',
        component: DefaultLoader
    },
    {
        name: 'deck',
        displayName: 'DeckLoader',
        component: DeckLoader
    }
]

export function getLoaderByName(name: string): LoaderInfo | undefined {
    return loadersRegistry.find(p => p.name === name)
}
