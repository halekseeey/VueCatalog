import {defineComponent, type PropType} from 'vue'
import styles from './styles.module.scss'
import {type Item} from '@/models'
import Card from '../Card'

export default defineComponent({
    props: {
        items: {
            type: Array as PropType<Item[]>,
            required: true,
        },
    },
    setup(props) {
        if (props.items.length === 0) {
            return <div>Ничего не найдено</div>
        }
        return () => (
            <div class={styles.container}>
                {props.items.map(item => (
                    <Card item={item}></Card>
                ))}
            </div>
        )
    },
})
