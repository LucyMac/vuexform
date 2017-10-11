import Vue from 'vue'
import Vuex from 'vuex'
import store from './store.js'
import ElementUI from 'element-ui'
import App from './App.vue'

Vue.use(Vuex);
Vue.use(ElementUI)

new Vue({
  store,
  el: '#app',
  render: h => h(App)
})
