import Request from '~~/utils/request';

class GelbooruApi extends Request {
    getList(body?: any) {
        return this.post('https://api.cerfai.com/open/get_full_categories', body);
    }

    getTagsById(body?: any) {
        return this.post('https://api.cerfai.com/open/get_tags_by_category', body);
    }

    searchTags(body?: any) {
        return this.post('https://api.cerfai.com/search_tags', body);
    }
}

export default new GelbooruApi();
