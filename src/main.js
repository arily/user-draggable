import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import router from './router/index.js'
// import InputList from './views/InputList.vue'
import App from './App.vue'
import Vuetify from "vuetify";
import AsyncComputed from 'vue-async-computed'

import "vuetify/dist/vuetify.min.css"; 
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(AsyncComputed)
// Vue.use(router); 
Vue.use(Vuetify);
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false


async function start(){
  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app')
} 
start();