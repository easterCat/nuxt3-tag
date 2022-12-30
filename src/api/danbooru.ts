import Request from '~~/src/utils/request';

class DanbooruApi extends Request {
    analysisImage(body?: any) {
        return this.post('/danbooru/analysis', body);
    }
}

export default new DanbooruApi();
