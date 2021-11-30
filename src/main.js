import Vue from 'vue'
import App from './App.vue'

import index from './index'
Vue.use(index)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import DemoView from "@/DOCS/DemoView";
import GettingStarted from "@/DOCS/views/GettingStarted";
const routes = [
    { path: '/', component: GettingStarted },
    { path: '/test', component: DemoView },
]

const router = new VueRouter({
    routes
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
