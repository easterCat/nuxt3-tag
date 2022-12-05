import Request from '~~/src/utils/request';

class GelbooruApi extends Request {
    getList(body?: any) {
        return this.post('https://api.cerfai.com/open/get_full_categories', body, 'github');
    }

    getTagsById(body?: any) {
        return this.post('https://api.cerfai.com/open/get_tags_by_category', body, 'github');
    }

    searchTags(body?: any) {
        return this.post('https://api.cerfai.com/search_tags', body, 'github');
    }
}

export default new GelbooruApi();
