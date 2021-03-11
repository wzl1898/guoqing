import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue
// TODO: manual import echarts parts
import 'echarts'

import './components/_globals'
import 'reset-css'
import 'normalize.css'

Vue.config.productionTip = false
Vue.component('v-chart', ECharts)
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
