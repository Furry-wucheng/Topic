<script setup>
    import { useUserStore } from "./stores/userStore";
    const userStore = useUserStore();
    //查看会话存储中是否有用户信息，如果有则放入userStore中
    const userInfo = sessionStorage.getItem("userInfo");
    if (userInfo) {
        userStore.isLogin = true;
        userStore.userInfo = JSON.parse(userInfo);
    }
</script>

<template>
    <RouterView></RouterView>
</template>

<style>
</style>
