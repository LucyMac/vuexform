import Vue from 'vue'
import Vuex from 'vuex'
// import 'element-ui/lib/theme-default/index.css'
import store from './store.js'
import ElementUI from 'element-ui'
import App from './App.vue'

Vue.use(ElementUI)
Vue.use(Vuex);

new Vue({
  store,
  el: '#app',
  render: h => h(App)
})