import Request from '~~/src/utils/request';

class TemplateApi extends Request {
    async getTemplates(params: any) {
        const config = useRuntimeConfig();
        const from = config.public.API_DATA_FROM;
        if (from === 'github') {
            const url =
                'https://raw.githubusercontent.com/easterCat/nuxt-utils-assets/main/json/templates.json';
            const result = await this.get(url);
            return { templates: JSON.parse(result), total: null };
        }
        if (from === 'database') {
            const url = `/get_templates`;
            const result = await this.get(url, params);
            const { data } = toRaw(result);
            return { templates: data.list, total: data.total };
        }
    }

    async getTemplatesNoval(params: any) {
        const url = `/get_templates_noval`;
        const result = await this.get(url, params);
        const { data } = toRaw(result);
        return { templates: data.list, total: data.total };
    }

    async getTemplatesChitu(params: any) {
        const url = `/get_templates_chitu`;
        const result = await this.get(url, params);
        const { data } = toRaw(result);
        return { templates: data.list, total: data.total };
    }

    async setIp() {
        const url = `/set_ip`;
        const result = await this.get(url);
        const ip = result.data.ip;
        const { $store } = useNuxtApp();
        $store.set('ip', ip);
        return { ip };
    }

    async likeTemplateById(body: any) {
        const url = `/template/favorite/${body.id}`;
        const result = await this.post(url, body);
        const { data } = toRaw(result);
        return { like: data.like };
    }
}

export default new TemplateApi();
