<template>
    <el-container>
        <el-header>
            <Navigation />
        </el-header>
        <el-main>
            <RouterView :key="$route.fullPath"></RouterView>
        </el-main>
    </el-container>
</template>

<script setup>
    import Navigation from "./components/Navigation.vue";
</script>

<style scoped>
</style>