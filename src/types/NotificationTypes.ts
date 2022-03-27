export interface NotificationTypes {
    notifications: Array<Notification>
}

export interface Notification {
    title: string,
    content: string,
    type: string,
    options: object,
    active: boolean,
    created: Date
}
