import Request from '~~/utils/request';

class ShopApi extends Request {
    translate(body?: any) {
        return this.post('http://127.0.0.1:5000/api/translate', body);
    }
}

export default new ShopApi();
