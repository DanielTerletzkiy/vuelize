// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import './style.css'
import {App} from "vue";
import {Vuelize} from "../../../src";
import Header from "../../components/Header.vue";

type Enhanced = {
    app: App,
    router: any,
    siteData: any,
}
export default {
    Layout,
    enhanceApp(data: Enhanced) {
        const {app} = data;
        app.use(Vuelize)
        app.component("Header", Header)
    }
}

