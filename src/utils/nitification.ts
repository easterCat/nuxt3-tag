import { ElNotification } from 'element-plus';

let notify: any = null;

export function notification(msg: string) {
    if (notify) {
        notify.close();
    }
    notify = ElNotification({
        showClose: true,
        message: msg,
        type: 'success',
        duration: 1500,
    });

    return notify;
}

export function warnNotification(msg: string) {
    if (notify) {
        notify.close();
    }
    notify = ElNotification({
        showClose: true,
        message: msg,
        type: 'warning',
        duration: 1500,
    });

    return notify;
}

export function errorNotification(msg: string) {
    if (notify) {
        notify.close();
    }
    notify = ElNotification({
        showClose: true,
        message: msg,
        type: 'error',
        duration: 1500,
    });

    return notify;
}
