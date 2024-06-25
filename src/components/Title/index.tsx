import {defineComponent} from 'vue'
import styles from './styles.module.scss'

export default defineComponent({
    props: {
        text: {
            type: String,
            required: true,
        },
    },
    setup({text}) {
        return () => <h1 class={styles.text}>{text}</h1>
    },
})
