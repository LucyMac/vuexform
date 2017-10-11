import Vue from 'vue'
import Vuex from 'vuex'
import store from './store.js'
import ElementUI from 'element-ui'
import App from './App.vue'
import locale from 'element-ui/lib/locale/lang/en'


Vue.use(Vuex);
Vue.use(ElementUI, { locale })

new Vue({
  store,
  el: '#app',
  render: h => h(App)
})
