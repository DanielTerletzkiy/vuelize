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
    key = 1;
    constructor(title, content, type, options) {
        this.title = title;
        this.content = content;
        this.type = type;
        this.options = options;
        this.created = new Date();
        this.key = this.created.getTime() + Math.round(Math.random() * 10000);
        this.startTimeout(this.options?.timeout);
    }
    startTimeout(timeoutTime = 3000) {
        this.timeout = setTimeout(() => {
            this.close();
        }, timeoutTime);
    }
    removeTimeout() {
        console.log(this.timeout);
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }
    close() {
        //whyyyyyyyyyyyyyyyyyyyyyyyyyyyy?????!!
        //fuck refs, but kinda dont...
        console.log(this.active);
        if (typeof this.active === "boolean") {
            this.active = false;
        }
        else {
            this.active.value = false;
        }
    }
}
//# sourceMappingURL=Notification.js.map