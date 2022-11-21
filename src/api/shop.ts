import Request from '~~/src/utils/request';

const config = useRuntimeConfig();
const url = config.public.FLASK_BASE_API;

class ShopApi extends Request {
    translate(body?: any) {
        return this.post(`${url}/translate`, body);
    }
}

export default new ShopApi();
