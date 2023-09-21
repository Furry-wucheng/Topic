<template>
    <el-card class="box-card">
        <div>
            {{ index + 1 }}、{{ topicDesc }}
            <span v-show="isRight" style="color: #67c23a;">（回答正确）</span>
            <span v-show="!isRight" style="color: #f56c6c">（回答错误）</span>
        </div>
        <!-- 题目图片 -->
        <el-image lazy :src="topicImg">
            <template #error>
                <div class="image-slot">
                    <el-icon size="40"><Picture /></el-icon>
                </div>
            </template>
        </el-image>
        <div>
            <p>你的答案是：{{ userAnswer }}</p>
            <p>标准答案：{{ rightAnswer }}</p>
        </div>
    </el-card>
</template>

<script setup>
    import { Picture } from "@element-plus/icons-vue";
    const { exercise } = defineProps(["exercise", "index"]);

    const { topicDesc, topicImg, userAnswer, rightAnswer, isRight } = toRefs(exercise);
</script>

<style scoped>
    .box-card {
        width: 700px;
        margin: 30px 0px;
    }

    .box-card * {
        margin: 5px;
    }

    .image-slot {
        display: flex;
        background-color: #e6e4e4;
        height: 200px;
        width: 300px;
        align-items: center;
        justify-content: center;
    }
</style>