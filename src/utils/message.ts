import { ElMessage } from 'element-plus';

let em: any = null;

export function message(msg: string) {
    if (em) {
        em.close();
    }
    em = ElMessage({
        showClose: true,
        message: msg,
        type: 'success',
    });

    return em;
}

export function warnMessage(msg: string) {
    if (em) {
        em.close();
    }
    em = ElMessage({
        showClose: true,
        message: msg,
        type: 'warning',
    });

    return em;
}

export function errorMessage(msg: string) {
    if (em) {
        em.close();
    }
    em = ElMessage({
        showClose: true,
        message: msg,
        type: 'error',
    });

    return em;
}
