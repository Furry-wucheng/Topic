<template>
        <el-card class="box-card-main">
            <el-space wrap :size="20">
                <el-card class="box-card" style="width: 300px; height: 400px">
                    <template #header>
                        <div class="card-header">
                            <span>数学测试</span>
                            <router-link to="/exercise/physics"><el-button class="button">开始答题</el-button></router-link>
                        </div>
                    </template>
                    <div><img src="@/assets/math.png" alt="" style="width: 100%;height: 100%;"></div>
                </el-card>
                <el-card class="box-card" style="width: 300px; height: 400px">
                    <template #header>
                        <div class="card-header">
                            <span>物理测试</span>
                            <router-link to="/exercise/physics"><el-button class="button">开始答题</el-button></router-link>
                        </div>
                    </template>
                    <div><img src="@/assets/phy.jpg" alt="" style="width: 100%;height: 100%;"></div>
                </el-card>
            </el-space>
        </el-card>
</template>

<script>
    export default {};
</script>
<style scoped>
.button{
    float:right
}

.el-card{
    height: 99%;
}

</style>