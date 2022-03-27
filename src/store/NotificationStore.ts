import {defineStore} from 'pinia'
import {NotificationTypes} from "../types/NotificationTypes";

export const NotificationStore = defineStore('notification', {
    state: () =>
        ({
            notifications: []
        } as NotificationTypes)
})
