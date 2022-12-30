<template>
    <div class="login-page page bg-base-100">
        <div class="content">
            <!-- <img src="https://image.lexica.art/md/07c55f51-4c5f-4c6b-a06f-aebe364958f5" alt="" /> -->
            <div class="outer-con">
                <div class="inner-con">
                    <div v-if="pageStatus === 'login'" class="login-con">
                        <div class="w-full form-control">
                            <div class="item-1">
                                <label class="label">
                                    <span class="label-text">用户名</span>
                                </label>
                                <input
                                    v-model="username"
                                    type="text"
                                    placeholder="请输入用户名"
                                    class="w-full input input-bordered"
                                />
                            </div>
                            <div class="item-2">
                                <label class="label">
                                    <span class="label-text">密码</span>
                                </label>
                                <input
                                    v-model="password"
                                    type="text"
                                    placeholder="请输入密码"
                                    class="w-full input input-bordered"
                                />
                            </div>
                        </div>
                        <div class="item-5">
                            <button class="btn btn-accent btn-block" @click="login">登录</button>
                        </div>
                        <a class="link link-accent" @click="changeStatus('register')">
                            没有账号,去注册
                        </a>
                    </div>
                    <div v-if="pageStatus === 'register'" class="register-con">
                        <div class="w-full form-control">
                            <div class="item-1">
                                <label class="label">
                                    <span class="label-text">用户名 (必填)</span>
                                </label>
                                <input
                                    v-model="username"
                                    type="text"
                                    placeholder="请输入用户名"
                                    class="w-full input input-bordered"
                                />
                            </div>
                            <div class="item-2">
                                <label class="label">
                                    <span class="label-text">密码 (必填)</span>
                                </label>
                                <input
                                    v-model="password"
                                    type="password"
                                    placeholder="请输入密码"
                                    class="w-full input input-bordered"
                                />
                            </div>
                            <div class="item-3">
                                <label class="label">
                                    <span class="label-text">昵称</span>
                                </label>
                                <input
                                    v-model="nickname"
                                    type="text"
                                    placeholder="请输入昵称,非必填"
                                    class="w-full input input-bordered"
                                />
                            </div>
                            <div class="item-4">
                                <label class="label">
                                    <span class="label-text">邮箱</span>
                                </label>
                                <input
                                    v-model="email"
                                    type="text"
                                    placeholder="请输入邮箱,非必填"
                                    class="w-full input input-bordered"
                                />
                            </div>
                        </div>
                        <div class="item-5">
                            <button class="btn btn-accent btn-block" @click="register">注册</button>
                        </div>
                        <a class="link link-accent" @click="changeStatus('login')">
                            已有账号,去登录
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <AppFooter />
    </div>
</template>

<script lang="ts" setup>
import { useIndexStore } from '@/store/index';
const { AuthApi } = useApi();
const router = useRouter();
const indexStore = useIndexStore();

const pageStatus = ref('login');
const username = ref('admin');
const password = ref('123456');
const email = ref('admin@qq.com');
const nickname = ref('超级管理员');

const changeStatus = (status: string) => {
    pageStatus.value = status;
};

const register = async () => {
    const result = await AuthApi.register({
        username: username.value,
        password: password.value,
        email: email.value,
        nickname: nickname.value,
    });
    const { code, data, msg } = result;
    if (code === 200 && data) {
        pageStatus.value = 'login';
        return ElMessage({
            type: 'success',
            message: '注册成功!欢迎您,' + data.register.username,
            showClose: true,
        });
    } else {
        return ElMessage({
            type: 'warning',
            message: msg,
            showClose: true,
        });
    }
};

const login = async () => {
    const result = await AuthApi.login({
        username: username.value,
        password: password.value,
    });
    const { code, data, msg } = result;
    indexStore.setUserInfo(data?.user);
    indexStore.setToken(data?.access_token, data?.refresh_token);
    if (code === 200 && data) {
        router.push({
            path: '/pc/home',
        });
        return ElMessage({
            type: 'success',
            message: '登录成功!欢迎您',
            showClose: true,
        });
    } else {
        return ElMessage({
            type: 'warning',
            message: msg,
            showClose: true,
        });
    }
};
</script>

<style lang="scss" scoped>
.login-page {
    .content {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;

        img {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
            width: 100%;
            height: 100%;
            filter: blur(10px);
        }
    }
    .outer-con {
        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent;
        background: hsl(var(--a) / 0);
        width: 800px;
        height: 680px;
        border-radius: 12px;
        animation-delay: 0s;
        animation-name: move;
        animation-duration: 0.7s;
        animation-fill-mode: cubic-bezier(0.42, 0, 0.58, 1);
    }

    .inner-con {
        display: flex;
        justify-content: center;
        align-items: center;
        background: hsl(var(--p) / 0);
        width: 700px;
        height: 600px;
        border-radius: 12px;
        padding: 20px;
        animation-delay: 0.1s;
        animation-name: move;
        animation-duration: 0.7s;
        animation-fill-mode: cubic-bezier(0.42, 0, 0.58, 1);
    }

    @mixin base-con {
        width: 400px;
        height: 460px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .login-con {
        @include base-con;
    }

    .register-con {
        @include base-con;
    }

    .item-1 {
        animation-delay: 0s;
        animation-name: slide-up;
        animation-duration: 1s;
        animation-fill-mode: cubic-bezier(0.42, 0, 0.58, 1);
    }

    .item-2 {
        animation-delay: 0s;
        animation-name: slide-up;
        animation-duration: 1.1s;
        animation-fill-mode: cubic-bezier(0.42, 0, 0.58, 1);
    }
    .item-3 {
        animation-delay: 0s;
        animation-name: slide-up;
        animation-duration: 1.2s;
        animation-fill-mode: cubic-bezier(0.42, 0, 0.58, 1);
    }
    .item-4 {
        animation-delay: 0s;
        animation-name: slide-up;
        animation-duration: 1.3s;
        animation-fill-mode: cubic-bezier(0.42, 0, 0.58, 1);
    }

    .item-5 {
        margin-top: 30px;
        width: 100%;
        animation-delay: 0s;
        animation-name: slide-up;
        animation-duration: 1.4s;
        animation-fill-mode: cubic-bezier(0.42, 0, 0.58, 1);
    }

    .link {
        margin-top: 30px;
    }
}
</style>
