<template>
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        :router="true"
    >
        <el-menu-item index="/">首页</el-menu-item>
        <!--<h3>题库</h3> -->
        <div class="flex-grow" />
        <!-- <el-menu-item index="1"> 刷题</el-menu-item> -->
        <el-sub-menu index="1">
            <template #title>刷题</template>
            <el-menu-item index="/exercise/math">数学</el-menu-item>
            <el-menu-item index="/exercise/physics">物理</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/analyse">分析</el-menu-item>
        <el-sub-menu index="3">
            <template #title
                ><el-icon><User /></el-icon
            ></template>
            <el-menu-item v-if="!isLogin" index="/login">登录</el-menu-item>
            <el-menu-item v-if="isLogin" disabled>{{userInfo.username}}</el-menu-item>
            <el-menu-item v-if="isLogin" @click="logout">退出</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script setup>
    import { useUserStore } from "@/stores/userStore";
    import { User } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
    const userStore = useUserStore();
    const router = useRouter()

    const { isLogin, userInfo } = userStore;

    function logout(){
        userStore.logout()
        router.go(0)
    }
</script>

<style scoped>
    .flex-grow {
        flex-grow: 1;
    }
    a {
        color: transparent;
    }
</style>