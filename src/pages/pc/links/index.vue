<template>
    <div class="links-page page bg-base-100">
        <ClientOnly><AppHeader /></ClientOnly>
        <AppAnimate>
            <div class="content">
                <pc-link-list :show-left-menu="true"></pc-link-list>
            </div>
        </AppAnimate>
        <AppFooter />
    </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
