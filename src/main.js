import { createApp } from 'vue';
import App from './App.vue';
import { VuelizePlugin } from "./index";
const app = createApp(App);
app.use(VuelizePlugin);
app.mount('#app');
//# sourceMappingURL=main.js.map