import Request from '~~/src/utils/request';

class DefaultTagsApi extends Request {
    getTags() {
        return this.get(
            'https://raw.githubusercontent.com/easterCat/nuxt-utils-assets/main/json/tags.json',
            {},
            'github',
        );
    }
}

export default new DefaultTagsApi();
