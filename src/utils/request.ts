import { uuid } from 'vue-uuid';

const fetch = (url: string, options?: any): Promise<any> => {
    const { $config } = useNuxtApp();
    const { VITE_API_HOST } = $config.public;
    const reqUrl = VITE_API_HOST ?? '' + url;
    // 不设置key，始终拿到的都是第一个请求的值，参数一样则不会进行第二次请求
    const key = uuid.v4();

    return new Promise(async (resolve, reject) => {
        useFetch(reqUrl, { ...options, key })
            .then(({ data, error }: any) => {
                if (error.value) {
                    reject(error.value);
                    return;
                }
                const value = data.value;
                if (!value) {
                    throw createError({
                        statusCode: 500,
                        statusMessage: reqUrl,
                        message: 'error',
                    });
                } else {
                    resolve(value);
                }
            })
            .catch((err: any) => {
                console.error(err);
                reject(err);
            });
    });
};

export default class Request {
    get = (url: string, params?: any) => {
        return fetch(url, { method: 'get', params });
    };

    post = (url: string, body?: any) => {
        return fetch(url, { method: 'post', body });
    };

    put = (url: string, body?: any) => {
        return fetch(url, { method: 'put', body });
    };

    delete = (url: string, body?: any) => {
        return fetch(url, { method: 'delete', body });
    };
}
