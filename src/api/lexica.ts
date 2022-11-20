import Request from '~~/src/utils/request';

class LexicaApi extends Request {
    getList(params?: any) {
        return this.get('https://lexica.art/api/v1/search', params);
    }
}

export default new LexicaApi();
