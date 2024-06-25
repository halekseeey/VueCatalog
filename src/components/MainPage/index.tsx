import {defineComponent, computed, ref, watch} from 'vue'
import Navbar from '../Navbar'
import Title from '../Title'
import Select from '../Select'
import {useStore, type SortOrder} from '@/stores/store'
import styles from './styles.module.scss'
import Catalog from '../Catalog'
import Cart from '../Cart'
import Header from '../Header'

type Option<T> = {
    value: T
    label: string
}

export const BASE_URL = '/VueCatalog'

export default defineComponent({
    setup() {
        const {getMaterials, getSortOptions, itemsWithMaterials} = useStore()
        const selectedMaterial = ref<Option<string> | undefined>(undefined)
        const selectedSortOption = ref<Option<SortOrder>>({
            value: 'default',
            label: 'По умолчанию',
        })

        const materialOptions = computed(() => {
            return getMaterials.reduce(
                (acc, material) => {
                    acc.push({
                        value: material.id,
                        label: material.name,
                    })
                    return acc
                },
                [{value: '', label: 'Не выбрано'}]
            )
        })

        const filteredItems = computed(() => {
            console.log(selectedSortOption.value, selectedMaterial.value)
            return itemsWithMaterials({
                sortOrder: selectedSortOption.value.value,
                selectedMaterial: selectedMaterial.value?.value,
            })
        })

        watch([selectedMaterial, selectedSortOption], () => {
            console.log(filteredItems.value)
        })

        return () => (
            <div class={styles.container}>
                <Header />
                <Title
                    class={styles.title}
                    text="Комплекты стеллажных систем"
                />
                <div class={styles.filters}>
                    <Select
                        options={getSortOptions}
                        class={styles.select}
                        label="Сортировать по:"
                        default="Не выбрано"
                        modelValue={selectedSortOption.value}
                        onUpdate:modelValue={(value: Option<SortOrder>) =>
                            (selectedSortOption.value = value)
                        }
                    />
                    <Select
                        options={materialOptions.value}
                        class={styles.select}
                        label="Материал"
                        default="Не выбрано"
                        modelValue={selectedMaterial.value}
                        onUpdate:modelValue={(value: Option<string>) =>
                            (selectedMaterial.value = value)
                        }
                    />
                </div>
                <Catalog items={filteredItems.value} />
            </div>
        )
    },
})
