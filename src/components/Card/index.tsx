import {computed, defineComponent, type PropType} from 'vue'
import styles from './styles.module.scss'
import type {Item} from '@/models'
import {useCartStore} from '@/stores/cartStore'
import {useFavoritesStore} from '@/stores/favoritesStore'
import {BASE_URL} from '../MainPage'

export default defineComponent({
    props: {
        item: {
            type: Object as PropType<Item>,
            required: true,
        },
    },
    setup(props) {
        const cartStore = useCartStore()
        const favoritesStore = useFavoritesStore()

        const addToCart = () => {
            cartStore.addItem({
                id: props.item.id,
                name: props.item.name,
                price: props.item.price.current_price,
                quantity: 1,
                imageUrl: props.item.image.url,
            })
        }

        const toggleFavorite = () => {
            if (favoritesStore.items.find(i => i.id === props.item.id)) {
                favoritesStore.removeItem(props.item.id)
            } else {
                favoritesStore.addItem({
                    id: props.item.id,
                    name: props.item.name,
                    price: props.item.price.current_price,
                    imageUrl: props.item.image.url,
                })
            }
        }

        const isFavorite = computed(() =>
            favoritesStore.items.some(i => i.id === props.item.id)
        )

        return () => (
            <div class={styles.card}>
                {props.item.price.old_price && (
                    <div class={styles.discountBadge}>Скидка</div>
                )}
                <img
                    src={BASE_URL + props.item.image.url}
                    alt={props.item.name}
                    class={styles.image}
                />
                <div class={styles.info}>
                    {props.item.code && (
                        <p class={styles.code}>{props.item.code}</p>
                    )}
                    <p class={styles.name}>{props.item.name}</p>
                    <div class={styles.footer}>
                        <div class={styles.prices}>
                            {props.item.price.old_price && (
                                <span class={styles.oldPrice}>
                                    {props.item.price.old_price}₽
                                </span>
                            )}
                            <span class={styles.currentPrice}>
                                {props.item.price.current_price}₽
                            </span>
                        </div>
                        <div class={styles.actions}>
                            <button
                                class={styles.actionButton}
                                onClick={addToCart}
                            >
                                <img src={`${BASE_URL}/cart.svg`} />
                            </button>
                            <button
                                class={styles.actionButton}
                                onClick={toggleFavorite}
                            >
                                <img
                                    src={
                                        isFavorite.value
                                            ? `${BASE_URL}/redHeart.svg`
                                            : `${BASE_URL}//heart.svg`
                                    }
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
})
