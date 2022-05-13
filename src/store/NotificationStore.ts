import {defineStore} from 'pinia'
import {Notifications} from "../types/Vuelize";

export const NotificationStore = defineStore('notification', {
    state: () =>
        ({
            notifications: []
        } as Notifications.NotificationStore)
})
