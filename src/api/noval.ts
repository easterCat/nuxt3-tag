import Request from '~~/src/utils/request';

class NovalApi extends Request {
    generate(body?: any) {
        return this.post(body.postUrl, body, 'github');
    }
}

export default new NovalApi();
