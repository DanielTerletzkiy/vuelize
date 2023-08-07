import {createApp} from 'vue'
import App from './App.vue'

import Vuelize from "./entry";

const app = createApp(App);
app.use(Vuelize, {
    dark: {
        colors: {
        }
    }
});

app.mount('#app');

