import {defineComponent, ref} from 'vue'
import styles from './styles.module.scss'

export default defineComponent({
    setup() {
        return () => (
            <nav class={styles.wrapper}>
                <ul class={styles.list}>
                    <li class={styles.item}>
                        <a href="#">Главная</a>
                    </li>
                    <li class={styles.item}>
                        <a href="#">Системы хранения</a>
                    </li>
                    <li class={styles.item}>
                        <a class={styles.active} href="#">
                            Комплекты стеллажных систем
                        </a>
                    </li>
                </ul>
            </nav>
        )
    },
})
