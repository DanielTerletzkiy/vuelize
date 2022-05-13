import {defineStore} from 'pinia'

export const NotificationStore = defineStore('notification', {
    state: () =>
        ({
            notifications: []
        } as Notifications.NotificationStore)
})
