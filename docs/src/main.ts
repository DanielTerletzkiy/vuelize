import {createApp} from 'vue'
import App from './App.vue'
import Vuelize from "../../src/index";

const app = createApp(App)
//@ts-ignore
app.use(Vuelize)
app.mount('#app')
