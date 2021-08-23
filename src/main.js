import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入全局样式
import './assets/css/global.less'
//引入字体文件
import './assets/font/iconfont.css'
import axios from 'axios'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'echarts/lib/component/tooltip'

const app = createApp(App)
//将全局的echarts对象挂载到VUE原型上
app.config.globalProperties.$echarts = window.echarts
app.config.globalProperties.$http = axios
app.use(ElementPlus)

app.use(store).use(router).mount('#app')
