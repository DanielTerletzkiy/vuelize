import {State} from "../../types/Vuelize";
import {ref, Ref} from "vue";

export default class Notification {
    title: string = "";
    content: string = "";
    type: State = State.Success;
    options: Notifications.Options = {color: "", icon: "", timeout: 5000};
    active: Ref<boolean> | boolean = ref(true);
    timeout: any = null;
    created: Date = new Date();

    constructor(title: string, content: string, type: State, options: Notifications.Options) {
        this.title = title;
        this.content = content;
        this.type = type;
        this.options = options;
        this.created = new Date();
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
        //fuck refs
        if (typeof this.active === "boolean") {
            this.active = false;
        } else {
            this.active.value = false;

        }
    }
}
