import Request from '~~/src/utils/request';

class LinkApi extends Request {
    async getLinks() {
        const config = useRuntimeConfig();
        const from = config.public.API_DATA_FROM;
        if (from === 'github') {
            const url =
                'https://raw.githubusercontent.com/easterCat/nuxt-utils-assets/main/json/links.json';
            const result = await this.get(url);
            return { links: JSON.parse(result), total: null };
        }
        if (from === 'database') {
            const result = await this.get('/get_links', { pageIndex: 1, pageSize: 1000 });
            const { data } = toRaw(result);
            return { links: data.list, total: data.total };
        }
    }

    async addLink(body: any) {
        const result = await this.post('/add_link', body);
        return result;
    }

    async updateLink(body: any) {
        const result = await this.post('/update_link', body);
        return result;
    }

    async deleteLink(body: any) {
        const result = await this.post(`/delete_link`, body);
        return result;
    }
}

export default new LinkApi();
