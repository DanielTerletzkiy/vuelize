import { State } from "../../types/Vuelize";
import { ref } from "vue";
export default class Notification {
    title = "";
    content = "";
    type = State.Success;
    options = { color: "", icon: "", timeout: 5000 };
    active = ref(true);
    timeout = null;
    created = new Date();
    constructor(title, content, type, options) {
        this.title = title;
        this.content = content;
        this.type = type;
        this.options = options;
        this.created = new Date();
        this.startTimeout(this.options?.timeout);
    }
    startTimeout(timeoutTime = 3000) {
        this.timeout = setTimeout(() => {
            this.close();
        }, timeoutTime);
    }
    removeTimeout() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }
    close() {
        console.log('close');
        this.active.value = false;
    }
}
//# sourceMappingURL=Notification.js.map