import {State} from "../../types/Vuelize";
import {ref, Ref} from "vue";

export default class Notification {
    title: string = "";
    content: string = "";
    type: State = State.success;
    options: Notifications.Options = {color: "", icon: "", timeout: 5000};
    active: Ref<boolean> | boolean = ref(true);
    timeout: any = null;
    created: Date = new Date();
    key: number = 1;

    constructor(title: string, content: string, type: State, options: Notifications.Options) {
        this.title = title;
        this.content = content;
        this.type = type;
        this.options = options;
        this.created = new Date();
        this.key = this.created.getTime() + Math.round(Math.random() * 10000);
        this.startTimeout(this.options?.timeout);
    }

    startTimeout(timeoutTime: number = 3000) {
        this.timeout = setTimeout(() => {
            this.close();
        }, timeoutTime)
    }

    removeTimeout() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    close() {
        //whyyyyyyyyyyyyyyyyyyyyyyyyyyyy?????!!
        //fuck refs, but kinda dont...
        if (typeof this.active === "boolean") {
            this.active = false;
        } else {
            this.active.value = false;

        }
    }
}
