import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入全局样式
import './assets/css/global.less'


const app = createApp(App)
//将全局的echarts对象挂载到VUE原型上
app.config.globalProperties.$echarts = window.echarts



app.use(store).use(router).mount('#app')
