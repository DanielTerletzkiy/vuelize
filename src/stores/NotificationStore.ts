import {defineStore} from 'pinia'
import {Notification, NotificationOptions, PositionHorizontal, PositionVertical} from "../types";

type State = {
    notifications: Map<number, Notification>,
    timeouts: Map<number, ReturnType<typeof setTimeout>>,
}

export const useVuelizeNotifications = defineStore('vuelizeNotifications', {
    state: (): State => ({
        notifications: new Map<number, Notification>(),
        timeouts: new Map<number, ReturnType<typeof setTimeout>>()
    }),

    actions: {
        notify(
            title: Notification['title'],
            content: Notification['content'],
            type: Notification['type'],
            position: Notification['position'] = {
                vertical: PositionVertical.bottom,
                horizontal: PositionHorizontal.right
            },
            persistent?: Notification['persistent']
        ) {
            const created = new Date();
            const key = created.getTime() + Math.round(Math.random() * 10000)

            const notification: Notification = {
                key,
                title,
                content,
                type,
                position,
                created,
                active: true,
                persistent: persistent ?? false,
                options: {
                    timeout: 5000,
                }
            }
            this.notifications.set(key, notification)
            if (!notification.persistent && notification.options?.timeout) {
                this.createTimeout(notification.key, notification.options?.timeout)
            }
            return key;
        },
        createTimeout(key: Notification['key'], timeout: NotificationOptions['timeout']) {
            const to: ReturnType<typeof setTimeout> = setTimeout(() => this.setNotificationActive(key, false), timeout);
            this.timeouts.set(key, to);
        },
        clearTimeout(key: Notification['key']) {
            const to = this.timeouts.get(key);
            if (!to) {
                return;
            }
            clearTimeout(to);
        },
        setNotificationActive(key: Notification['key'], state: Notification['active'] = false) {
            const notification = this.notifications.get(key);
            if (!notification) {
                return;
            }
            notification.active = state;
            this.notifications.set(key, notification);
        }
    },
    getters: {
        getPositionalNotifications: (state) => {
            return (position: Notification['position'] = {
                vertical: PositionVertical.bottom,
                horizontal: PositionHorizontal.right
            },): Notification[] => {
                const notificationMap = [...state.notifications].filter(([, notification]) =>
                    notification.position.vertical == position.vertical &&
                    notification.position.horizontal == position.horizontal &&
                    notification.active
                )
                return notificationMap.map(([, notification]) => notification)
            }
        },
    }
})
