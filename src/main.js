import Vue from 'vue'
import App from './App.vue'

//Imports SCSS
import "./styles/index.scss"

//Imports store
import store from "@/store";

//Imports Unicon
import Unicon from 'vue-unicons/dist/vue-unicons-vue2.es'
import * as uc from 'vue-unicons/dist/icons'
const objArray = [];
Object.keys(uc).forEach(key => objArray.push(
    uc[key]
));
Unicon.add(objArray)
Vue.use(Unicon)


Vue.config.productionTip = false

Vue.mixin({
    methods: {
        processColor(color) {
            let colorOut = '';
            if (this.$store.state.theme.dark) {
                colorOut = this.$store.state.theme.themes.dark[color]
            } else {
                colorOut = this.$store.state.theme.themes.light[color]
            }
            if (!colorOut) {
                return color
            }else {
                return colorOut
            }
        }
    }
})

new Vue({
    render: h => h(App),
    store,
}).$mount('#app')
