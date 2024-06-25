import {defineComponent} from 'vue'
import {useFavoritesStore} from '@/stores/favoritesStore'
import styles from './styles.module.scss'

export default defineComponent({
    setup() {
        const favoritesStore = useFavoritesStore()

        return () => (
            <div class={styles.favorites}>
                <h2>Избранное</h2>
                {favoritesStore.items.length === 0 ? (
                    <div>Нет избранных товаров</div>
                ) : (
                    <div>
                        {favoritesStore.items.map(item => (
                            <div key={item.id} class={styles.favoriteItem}>
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    class={styles.itemImage}
                                />
                                <div class={styles.itemInfo}>
                                    <p class={styles.itemName}>{item.name}</p>
                                    <p class={styles.itemPrice}>
                                        Цена: {item.price}₽
                                    </p>
                                    <button
                                        onClick={() =>
                                            favoritesStore.removeItem(item.id)
                                        }
                                        class={styles.deleteButton}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    },
})
