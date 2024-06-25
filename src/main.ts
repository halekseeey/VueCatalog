import {createApp} from 'vue'
import {createPinia} from 'pinia'
import MainPage from './components/MainPage'
import 'normalize.css'

const app = createApp(MainPage)

app.use(createPinia())

app.mount('#app')
