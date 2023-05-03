import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
// import 'ant-design-vue/dist/antd.css'
import { Image } from 'ant-design-vue'

const app = createApp(App)

app.use(router)
app.use(Image)

app.mount('#app')
