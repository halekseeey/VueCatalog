import {defineComponent, ref} from 'vue'
import styles from './styles.module.scss'
import Cart from '../Cart'
import Navbar from '../Navbar'
import Favorites from '../Favorites' // Исправлено

export default defineComponent({
    name: 'Header',
    setup() {
        const isCartVisible = ref(false)
        const isFavoritesVisible = ref(false)

        const toggleCartVisibility = () => {
            isCartVisible.value = !isCartVisible.value
            isFavoritesVisible.value = false
        }

        const toggleFavoritesVisibility = () => {
            isFavoritesVisible.value = !isFavoritesVisible.value
            isCartVisible.value = false
        }

        return () => (
            <header class={styles.header}>
                <Navbar />
                <div>
                    <button
                        class={styles.cartButton}
                        onClick={toggleFavoritesVisibility}
                    >
                        ❤️
                    </button>
                    <button
                        class={styles.cartButton}
                        onClick={toggleCartVisibility}
                    >
                        🛒
                    </button>
                </div>
                {isCartVisible.value && <Cart class={styles.cart} />}
                {isFavoritesVisible.value && <Favorites class={styles.cart} />}
            </header>
        )
    },
})
