import {defineComponent, ref, type PropType} from 'vue'
import styles from './styles.module.scss'

interface Option {
    value: string
    label: string
}

export default defineComponent({
    props: {
        options: {
            type: Array as PropType<Option[]>,
            required: true,
        },
        label: {
            type: String,
            default: 'Select an option',
        },
        modelValue: {
            type: Object as PropType<Option | undefined>,
            default: undefined,
        },
        default: {
            type: String,
            default: 'Не выбрано',
        },
    },
    emits: ['update:modelValue'],
    setup(props, {emit}) {
        const isVisible = ref(false)

        const onLabelClick = () => {
            isVisible.value = !isVisible.value
        }

        const selectOption = (option: Option) => {
            emit('update:modelValue', option)
            isVisible.value = false
        }

        return () => (
            <div class={styles.container}>
                <label class={styles.label}>{props.label}</label>
                <div class={styles.select}>
                    <button
                        class={styles.selectedOption}
                        onClick={onLabelClick}
                    >
                        <span>{props.modelValue?.label ?? props.default}</span>
                        <img
                            src="/arrow.svg"
                            class={`${styles.arrowIcon} ${
                                isVisible.value ? styles.rotated : ''
                            }`}
                        />
                    </button>
                    {isVisible.value && (
                        <ul class={styles.options}>
                            {props.options.map(option => (
                                <li class={styles.option} key={option.value}>
                                    <button
                                        onClick={() => selectOption(option)}
                                    >
                                        {option.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        )
    },
})
