import {defineComponent} from 'vue'
import {useCartStore} from '@/stores/cartStore'
import styles from './styles.module.scss'

export default defineComponent({
    setup() {
        const cartStore = useCartStore()

        return () => (
            <div class={styles.cart}>
                <h2>Корзина</h2>
                {cartStore.items.length === 0 ? (
                    <div>Корзина пуста</div>
                ) : (
                    <div>
                        {cartStore.items.map(item => (
                            <div key={item.id} class={styles.cartItem}>
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    class={styles.itemImage}
                                />
                                <div class={styles.itemInfo}>
                                    <p class={styles.itemName}>{item.name}</p>
                                    <p class={styles.itemQuantity}>
                                        Количество: {item.quantity}
                                    </p>
                                    <p class={styles.itemPrice}>
                                        Цена: {item.price}₽
                                    </p>
                                    <button
                                        onClick={() =>
                                            cartStore.removeItem(item.id)
                                        }
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div class={styles.cartSummary}>
                            <p>Общее количество: {cartStore.itemCount}</p>
                            <p>Общая стоимость: {cartStore.totalPrice}₽</p>
                            <button onClick={() => cartStore.clearCart()}>
                                Очистить корзину
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )
    },
})
