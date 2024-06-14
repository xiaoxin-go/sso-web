import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css'
import VAR from '../modules/index';
import Notifications from '@kyvg/vue3-notification'

const app = createApp(App)
app.use(router)
app.use(Antd)
app.use(VAR)
app.use(Notifications)
app.mount('#app')

export {default as MyComponent} from './views/Home.vue'
