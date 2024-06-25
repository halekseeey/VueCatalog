import {defineStore} from 'pinia'

interface FavoriteItem {
    id: string
    name: string
    price: number
    imageUrl: string
}

export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        items: JSON.parse(
            localStorage.getItem('favorites') || '[]'
        ) as FavoriteItem[],
    }),
    actions: {
        addItem(item: FavoriteItem) {
            if (!this.items.find(i => i.id === item.id)) {
                this.items.push(item)
                this.saveFavorites()
            }
        },
        removeItem(itemId: string) {
            this.items = this.items.filter(item => item.id !== itemId)
            this.saveFavorites()
        },
        clearFavorites() {
            this.items = []
            this.saveFavorites()
        },
        saveFavorites() {
            localStorage.setItem('favorites', JSON.stringify(this.items))
        },
    },
    getters: {
        itemCount: state => state.items.length,
    },
})
