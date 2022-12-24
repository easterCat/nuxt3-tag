import { defineStore } from 'pinia';

export const useIndexStore = defineStore({
    id: 'index-store',
    state: () => {
        return {
            userInfo: localStorage.getItem('user')
                ? JSON.parse(localStorage.getItem('user') as string)
                : { nickname: '', username: '', id: '', email: '', role_id: '' },
            access_token: localStorage.getItem('access_token')
                ? JSON.parse(localStorage.getItem('access_token') as string)
                : '',
            refresh_token: localStorage.getItem('refresh_token')
                ? JSON.parse(localStorage.getItem('refresh_token') as string)
                : '',
        };
    },

    getters: {
        nickname: (state) => state.userInfo.nickname,
        username: (state) =>
            state.userInfo.nickname ? state.userInfo.nickname : state.userInfo.username,
        userId: (state) => state.userInfo.id,
        email: (state) => state.userInfo.email,
        roleId: (state) => state.userInfo.role_id,
    },

    actions: {
        setUserInfo(info: any) {
            this.userInfo = { ...info };
            localStorage.setItem('user', JSON.stringify(this.userInfo));
        },
        setToken(access_token: string, refresh_token: string) {
            this.access_token = access_token;
            this.refresh_token = refresh_token;
            localStorage.setItem('access_token', JSON.stringify(this.access_token));
            localStorage.setItem('refresh_token', JSON.stringify(this.refresh_token));
        },
        clearUserInfo() {
            this.userInfo = { nickname: '', username: '', id: '', email: '', role_id: '' };
            localStorage.removeItem('user');
        },
        clearToken() {
            this.access_token = '';
            this.refresh_token = '';
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        },
        async refresh() {
            const { AuthApi } = useApi();
            const result = await AuthApi.refresh();
            if (result.code === 200) {
                const { access_token } = result.data;
                this.access_token = access_token;
                localStorage.setItem('access_token', JSON.stringify(access_token));
            }
        },
    },
});
