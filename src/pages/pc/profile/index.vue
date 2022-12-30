<template>
    <div class="profile-page page">
        <ClientOnly><AppHeader /></ClientOnly>
        <div class="content">
            <div class="banner-con">
                <div class="banner-image">
                    <img src="@/assets/imgs/banner/sYw7uX71Xe.jpeg" alt="" />
                </div>
            </div>
            <div class="profile-con">
                <div class="avatar-con">
                    <div class="avatar">
                        <div class="w-32 rounded-full">
                            <img src="https://placeimg.com/192/192/people" />
                        </div>
                    </div>
                </div>
                <div class="info-con">
                    <div class="left">
                        <div class="shadow stats">
                            <div class="stat place-items-center">
                                <div class="stat-title">关注</div>
                                <div class="stat-value">999</div>
                                <div class="stat-desc">截止 January 1st to February 1st</div>
                            </div>

                            <div class="stat place-items-center">
                                <div class="stat-title">追随</div>
                                <div class="stat-value text-secondary">4,200</div>
                                <div class="stat-desc text-secondary">
                                    截止 January 1st to February 1st
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="center">
                        <div class="shadow stats">
                            <div class="stat place-items-center">
                                <div class="stat-title">昵称</div>
                                <div class="stat-value">{{ indexStore.nickname }}</div>
                                <div class="stat-desc">截止 January 1st to February 1st</div>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="shadow stats">
                            <div class="stat place-items-center">
                                <div class="stat-title">用户等级</div>
                                <div class="stat-value">{{ userLevel() }}</div>
                                <div class="stat-desc">截止 January 1st to February 1st</div>
                            </div>

                            <div class="stat place-items-center">
                                <div class="stat-title">加入天数</div>
                                <div class="stat-value text-secondary">
                                    {{ joinDay() }}
                                </div>
                                <div class="stat-desc text-secondary">
                                    截止 January 1st to February 1st
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tabs-con">
                <div class="tabs">
                    <a class="tab tab-lg tab-bordered tab-active">收藏</a>
                </div>
            </div>
            <div class="collect-con">
                <el-row class="list-con" :gutter="20">
                    <ClientOnly>
                        <el-col
                            v-for="(tem, tIndex) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                            :key="tIndex"
                            :xs="24"
                            :sm="12"
                            :md="6"
                            :lg="4"
                            :xl="4"
                            v-animate-css="{
                                direction: 'modifySlideInUp',
                                delay: tIndex * 50,
                            }"
                        >
                            <div class="shadow-xl card card-compact bg-base-100 m-b-20">
                                <figure>
                                    <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
                                </figure>
                                <div class="card-body">
                                    <h2 class="card-title">Shoes!</h2>
                                    <p>If a dog chews shoes whose shoes does he choose?</p>
                                    <div class="justify-end card-actions">
                                        <button class="btn btn-sm btn-accent">模版详情</button>
                                        <button class="btn btn-sm btn-secondary">取消收藏</button>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </ClientOnly>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { useIndexStore } from '@/store/index';

const indexStore = useIndexStore();

const joinDay = () => {
    const minus = dayjs(dayjs().format('YYYY-MM-DD')).diff(indexStore.userInfo.create_time, 'day');
    return minus;
};

const userLevel = () => {
    if (!indexStore.roleId) return '';
    const obj: any = {
        '1': '管理员',
        '2': '开发者',
        '3': '贡献者',
        '4': '游客',
    };
    return obj[indexStore.roleId];
};
</script>

<style scoped>
.profile-page {
    height: 100vh;
    overflow-y: hidden;
    overflow-y: scroll;

    .banner-con {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 344px;
        z-index: 3;
        overflow: hidden;
        position: relative;
        box-sizing: border-box;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;

        .banner-image {
            width: 100%;
            height: 700px;
            object-fit: cover;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            z-index: -1;
            transform: translateY(-130px);

            > img {
                width: 100%;
                height: 100%;
                filter: blur(8px);
            }
        }
    }

    .profile-con {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .avatar-con {
        height: 0px;
        transform: translateY(-120px);
        background: #fff;
        z-index: 100;
    }

    .info-con {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: hsl(var(--b1) / 1);
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .tabs-con {
        margin-top: 20px;
        background: hsl(var(--b1) / 1);
        border-radius: 10px;
        height: auto;
        line-height: auto;
        padding: 10px 0px 0px 0px;
    }

    .collect-con {
        margin-top: 20px;
    }
}
</style>
