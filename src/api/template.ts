import Request from '~~/src/utils/request';

const config = useRuntimeConfig();
const api = config.public.FLASK_BASE_API;
const from = config.public.API_DATA_FROM;

class TemplateApi extends Request {
    async getTemplates(params: any) {
        let url = '';
        if (from === 'github') {
            url =
                'https://raw.githubusercontent.com/easterCat/nuxt-utils-assets/main/json/templates.json';
            const result = await this.get(url);
            return { templates: JSON.parse(result), total: null };
        }
        if (from === 'database') {
            url = `${api}/get_templates`;
            const result = await this.get(url, params);
            const { data } = toRaw(result);
            return { templates: data.list, total: data.total };
        }
    }

    async setIp() {
        let url = `${api}/set_ip`;
        const result = await this.get(url);
        const ip = result.data.ip;
        const { $store } = useNuxtApp();
        $store.set('ip', ip);
        return { ip };
    }

    async likeTemplateById(body: any) {
        let url = `${api}/like_template_by_id`;
        const result = await this.post(url, body);
        const { data } = toRaw(result);
        return { like: data.like };
    }
}

export default new TemplateApi();
