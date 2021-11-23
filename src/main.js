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
    props: {
        color: String,
    },

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
            } else {
                return colorOut
            }
        },
        getContrast(color) {
            let hexColor = this.processColor(color??this.color);
            if (hexColor.slice(0, 1) === '#') {
                hexColor = hexColor.slice(1);
            }
            if (hexColor.length === 3) {
                hexColor = hexColor.split('').map(function (hex) {
                    return hex + hex;
                }).join('');
            }
            // Convert to RGB value
            let r = parseInt(hexColor.substr(0, 2), 16);
            let g = parseInt(hexColor.substr(2, 2), 16);
            let b = parseInt(hexColor.substr(4, 2), 16);
            // Get YIQ ratio
            let yiq = ((r * 299) + (g * 395) + (b * 114)) / 1000;
            // Check contrast
            return (yiq >= 128) ? 'black' : 'white';

        }
    },
    computed: {
        themeClass() {
            return {'theme--dark': this.$store.state.theme.dark, 'theme--light': !this.$store.state.theme.dark}
        },
        stylesObject() {
            return {color: this.processColor(this.color)}
        }
    },

})

new Vue({
    render: h => h(App),
    store,
}).$mount('#app')
