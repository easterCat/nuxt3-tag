import Request from '~~/src/utils/request';

class ShopApi extends Request {
    translate(body?: any) {
        return this.post('http://www.ptg.life/papi/translate', body);
    }
}

export default new ShopApi();
