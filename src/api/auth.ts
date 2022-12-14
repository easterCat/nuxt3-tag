import Request from '~~/src/utils/request';

class AuthApi extends Request {
    async register(body: any) {
        const result = await this.post('/register', body);
        return result;
    }

    async login(body: any) {
        const result = await this.post('/login', body);
        return result;
    }

    async logout() {
        const result = await this.get('/logout');
        return result;
    }
}

export default new AuthApi();
