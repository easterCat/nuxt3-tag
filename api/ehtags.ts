import Request from '~~/utils/request';

class EhtagsApi extends Request {
    getEhtags(params?: any) {
        return this.get(
            'https://raw.githubusercontent.com/scooderic/exhentai-tags-chinese-translation/master/dist/ehtags-cn.json',
            params,
        );
    }
}

export default new EhtagsApi();
