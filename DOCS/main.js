import Vue from 'vue'
import App from './App.vue'

import index from '@'

Vue.use(index)

import VueRouter from 'vue-router'

Vue.use(VueRouter)

Vue.prototype.$getStyle = function (className_, noSelector = false) {

    let styleSheets = window.document.styleSheets;
    let styleSheetsLength = styleSheets.length;
    for (let i = 0; i < styleSheetsLength; i++) {
        let classes = styleSheets[i].rules || styleSheets[i].cssRules;
        if (!classes)
            continue;
        let classesLength = classes.length;
        for (let x = 0; x < classesLength; x++) {
            if (classes[x].selectorText === className_) {
                let ret;
                if (classes[x].cssText) {
                    ret = classes[x].cssText;
                } else {
                    ret = classes[x].style.cssText;
                }
                if (ret.indexOf(classes[x].selectorText) === -1) {
                    ret = classes[x].selectorText + "{" + ret + "}";
                }
                if(noSelector){
                    ret = ret.match(/{.+?}/g)[0]
                }
                console.log(ret)
                return ret;
            }
        }
    }

}

import DemoView from "./DemoView";
import GettingStarted from "./views/GettingStarted";
import Wrapper from "./views/Wrapper";

const routes = [
    {
        path: '/',
        redirect: 'getting_started'
    },
    {
        path: '/getting_started',
        name: 'Getting Started',
        component: GettingStarted
    },
    {
        path: '/directives/:directive?',
        name: 'Directives',
        component: Wrapper,
    },
    {
        path: '/components',
        name: 'Components',
        component: DemoView
    },
]

const router = new VueRouter({
    routes
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
