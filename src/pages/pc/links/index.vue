<template>
    <NuxtLayout>
        <div class="links-page page">
            <AppHeader />
            <div class="content">
                <div class="link-con">
                    <app-animate name="fadeIn">
                        <pc-area-title title="常用"></pc-area-title>
                    </app-animate>
                    <pc-link-list filter="hot"></pc-link-list>
                    <app-animate name="fadeIn">
                        <pc-area-title title="标签"></pc-area-title>
                    </app-animate>
                    <pc-link-list filter="prompt"></pc-link-list>
                    <app-animate name="fadeIn">
                        <pc-area-title title="在线AI"></pc-area-title>
                    </app-animate>
                    <pc-link-list filter="online"></pc-link-list>
                    <app-animate name="fadeIn">
                        <pc-area-title title="未分类"></pc-area-title>
                    </app-animate>
                    <pc-link-list filter="other"></pc-link-list>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.link-con {
    width: 100%;
    background: white;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
}
</style>
