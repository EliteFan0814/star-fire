import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
import 'amfe-flexible'
import Vant from 'vant'
import 'vant/lib/index.css';
import '@/styles/style.scss'
import InfiniteLoading from 'vue-infinite-loading';
import '@/utils/request'
Vue.use(InfiniteLoading)
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
