import { uuid } from 'vue-uuid';

const fetch = (url: string, options?: any, from?: string): Promise<any> => {
    const config = useRuntimeConfig();
    const api = config.public.FLASK_BASE_API;
    const dataFrom = config.public.API_DATA_FROM;

    let reqUrl = '';
    if (dataFrom === 'github' || from === 'github') {
        // 当from是github时,使用全部传入url
        reqUrl = url;
    } else {
        reqUrl = api + url;
    }

    return new Promise(async (resolve, reject) => {
        // 不设置key，始终拿到的都是第一个请求的值，参数一样则不会进行第二次请求
        try {
            const result = await $fetch(reqUrl, { ...options, key: uuid.v4() });
            if (result) {
                resolve(result);
            } else {
                reject(`${reqUrl} => 数据获取失败`);
            }
        } catch (error) {
            console.error('$fetch出现错误 => ', error);
            reject(error);
        }
    });
};

export default class Request {
    get = (url: string, params?: any, from?: string) => {
        return fetch(url, { method: 'get', params }, from);
    };

    post = (url: string, body?: any, from?: string) => {
        return fetch(url, { method: 'post', body }, from);
    };

    put = (url: string, body?: any, from?: string) => {
        return fetch(url, { method: 'put', body }, from);
    };

    delete = (url: string, body?: any, from?: string) => {
        return fetch(url, { method: 'delete', body }, from);
    };
}
