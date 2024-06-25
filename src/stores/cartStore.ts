import {defineStore} from 'pinia'

interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    imageUrl: string
}

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[],
    }),
    actions: {
        addItem(item: CartItem) {
            const existingItem = this.items.find(i => i.id === item.id)
            if (existingItem) {
                existingItem.quantity += item.quantity
            } else {
                this.items.push(item)
            }
            this.saveCart()
        },
        removeItem(itemId: string) {
            const existingItem = this.items.find(i => i.id === itemId)
            if (existingItem) {
                existingItem.quantity -= 1
                if (existingItem.quantity === 0) {
                    this.items = this.items.filter(item => item.id !== itemId)
                }
                this.saveCart()
            }
        },
        clearCart() {
            this.items = []
            this.saveCart()
        },
        saveCart() {
            localStorage.setItem('cart', JSON.stringify(this.items))
        },
    },
    getters: {
        itemCount: state =>
            state.items.reduce((acc, item) => acc + item.quantity, 0),
        totalPrice: state =>
            state.items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            ),
    },
})
