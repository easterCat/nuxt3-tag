import Request from '~~/src/utils/request';

const config = useRuntimeConfig();
const api = config.public.FLASK_BASE_API;
const from = config.public.API_DATA_FROM;

class LinkApi extends Request {
    async getLinks() {
        let url = '';
        if (from === 'github') {
            url =
                'https://raw.githubusercontent.com/easterCat/nuxt-utils-assets/main/json/links.json';
            const result = await this.get(url);
            return { links: JSON.parse(result), total: null };
        }
        if (from === 'database') {
            url = `${api}/get_links`;
            const result = await this.get(url, { pageIndex: 1, pageSize: 233 });
            const { data } = toRaw(result);
            return { links: data.list, total: data.total };
        }
    }

    async addLink(body: any) {
        const url = `${api}/add_link`;
        const result = await this.post(url, body);
        return result;
    }

    async updateLink(body: any) {
        const url = `${api}/update_link`;
        const result = await this.post(url, body);
        return result;
    }

    async deleteLink(body: any) {
        const url = `${api}/delete_link`;
        const result = await this.post(url, body);
        return result;
    }
}

export default new LinkApi();
