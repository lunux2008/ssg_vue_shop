import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
//@ts-ignore
import globalComponent from "@/components/index.ts"
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
import "@/styles/index.scss"
import "virtual:svg-icons-register"
import { createApp } from 'vue'
import App from '@/App.vue'
import router from "@/router"
import pinia from "@/store"

const app = createApp(App)

app.config.devtools = true;

app.use(ElementPlus, {
	locale: zhCn
})

app.use(globalComponent)

app.use(router)

app.use(pinia)

import "@/permission"

app.mount('#app')
