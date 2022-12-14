import { defineStore } from 'pinia';

export const useIndexStore = defineStore({
    id: 'index-store',
    state: () => {
        return {
            userInfo: { nickname: '' },
        };
    },

    getters: {
        nickname: (state) => state.userInfo.nickname,
    },

    actions: {
        setUserInfo(info: any) {
            this.userInfo = { ...info };
        },
    },
});
