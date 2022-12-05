import Request from '~~/src/utils/request';

class EhtagsApi extends Request {
    getEhtags() {
        return this.get(
            'https://raw.githubusercontent.com/scooderic/exhentai-tags-chinese-translation/master/dist/ehtags-cn.json',
            {},
            'github',
        );
    }
}

export default new EhtagsApi();
