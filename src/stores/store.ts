import {computed} from 'vue'
import {defineStore} from 'pinia'
import type {Item, Material} from '@/models'

export type SortOrder = 'default' | 'asc' | 'desc'

type SortOption = {
    value: SortOrder
    label: string
}

export type FilterOptions = {
    sortOrder?: SortOrder
    selectedMaterial?: string
}

export const useStore = defineStore('store', {
    state: () => ({
        items: [
            {
                id: '1',
                name: 'Ручка дверная',
                code: 'L422WH',
                price: {
                    old_price: 400,
                    current_price: 355,
                },
                image: {
                    url: '/image.png',
                },
                material: 1,
            },
            {
                id: '2',
                name: 'Ручка, нержавеющ сталь',
                code: 'L423WH',
                price: {
                    old_price: 400.9,
                    current_price: 355.555,
                },
                image: {
                    url: '/image.png',
                },
                material: 2,
            },
            {
                id: '3',
                name: 'Стандартные петли',
                code: 'P424WN',
                price: {
                    old_price: null,
                    current_price: 75,
                },
                image: {
                    url: '/image.png',
                },
                material: 2,
            },
            {
                id: '4',
                name: 'Петля со стопором',
                code: 'PW5AC',
                price: {
                    old_price: 270,
                    current_price: 200,
                },
                image: {
                    url: '/image.png',
                },
                material: 2,
            },
            {
                id: '5',
                name: 'Ручка дверная',
                code: 'LM352',
                price: {
                    old_price: null,
                    current_price: 720,
                },
                image: {
                    url: '/image.png',
                },
                material: 1,
            },
            {
                id: '6',
                name: 'Ручка, нержавеющ сталь',
                code: null,
                price: {
                    old_price: null,
                    current_price: 355.555,
                },
                image: {
                    url: '/image.png',
                },
                material: 2,
            },
            {
                id: '7',
                name: 'Стандартные петли',
                code: 'WD14LK',
                price: {
                    old_price: null,
                    current_price: 75,
                },
                image: {
                    url: '/image.png',
                },
                material: 2,
            },
            {
                id: '8',
                name: 'Петля со стопором',
                code: null,
                price: {
                    old_price: 1200,
                    current_price: 900,
                },
                image: {
                    url: '/image.png',
                },
                material: 2,
            },
        ] as Item[],
        sortOptions: [
            {
                value: 'default',
                label: 'По умолчанию',
            },
            {
                value: 'asc',
                label: 'По возрастанию',
            },
            {
                value: 'desc',
                label: 'По убыванию',
            },
        ] as SortOption[],
        materials: [
            {
                id: '1',
                name: 'Дерево',
            },
            {
                id: '2',
                name: 'Металл',
            },
        ] as Material[],
    }),
    getters: {
        getSortOptions: state => state.sortOptions,
        getMaterials: state => state.materials,
        itemsWithMaterials: state => (options: FilterOptions) => {
            const {sortOrder = 'default', selectedMaterial} = options
            let filteredItems = state.items.map(item => {
                const material = state.materials.find(
                    mat => mat.id === item.material.toString()
                )
                return {
                    ...item,
                    materialName: material ? material.name : null,
                }
            })

            if (selectedMaterial) {
                filteredItems = filteredItems.filter(
                    item => item.material.toString() === selectedMaterial
                )
            }

            if (sortOrder === 'asc') {
                filteredItems.sort(
                    (a, b) => a.price.current_price - b.price.current_price
                )
            } else if (sortOrder === 'desc') {
                filteredItems.sort(
                    (a, b) => b.price.current_price - a.price.current_price
                )
            }

            return filteredItems
        },
    },
    actions: {},
})
