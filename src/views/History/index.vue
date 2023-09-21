<template>
    <div class="exercise-main">
        <div class="topic-list">
            <TopicCard
                v-for="(exercise, index) in exerciseList"
                :key="exercise.topicID"
                :index="index"
                :exercise="exercise"
                >{{ console.log(exercise, index) }}</TopicCard
            >
            <div class="operat">
                <ElButton @click="back">返回</ElButton>
            </div>
        </div>
        <el-card
            v-show="width > 1120"
            class="fixed-info"
            :style="{ top: `${y}px` }"
        >
            <template #header>
                <div class="card-header">
                    <span>答题情况</span>
                    <ElButton @click="back" style="float: right">返回</ElButton>
                </div>
            </template>
            <div class="complate-list">
                <ul>
                    <li
                        v-for="(exercise, index) in exerciseList"
                        :key="exercise.topicID"
                        class="complate-list-item"
                        :class="{
                            noRight: !exercise.isRight,
                            isRight: exercise.isRight,
                        }"
                    >
                        {{ index + 1 }}
                    </li>
                </ul>
            </div>
        </el-card>
    </div>
</template>

<script setup>
    import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
    import { useScroll, useWindowSize } from "@vueuse/core";
    import TopicCard from "./components/TpoicCard.vue";
    import { getAnswerHistoryByExeciseID } from "@/apis/analyse";
    import { useUserStore } from "@/stores/userStore";

    const route = useRoute();
    const router = useRouter();
    const userStore = useUserStore();
    //控制侧滑栏用到的参数
    const { y } = useScroll(window);
    const { width } = useWindowSize();

    //发送请求携带测验ID
    const exerciseID = ref(route.params.exerciseID);

    //准备的空题目数组
    const exerciseList = ref([]);

    //获取题目
    const getExercisesList = async () => {
        //获取题目列表
        const res = await getAnswerHistoryByExeciseID(exerciseID.value).catch(
            () => {
                ElMessage({
                    type: "error",
                    message: "获取答题历史失败，请稍后重试",
                });
                router.go(-1);
            }
        );
        //将信息填入题目列表中
        exerciseList.value = res.result.exerciseList;
        console.log(exerciseList.value);
    };

    function back(){
        router.go(-1);
    }

    // 当离开时执行（暂未完成）
    // onBeforeRouteLeave()

    onMounted(() => {
        getExercisesList();
    });
</script>

<style scoped>
    .exercise-main {
        display: flex;
        width: 100%;
        justify-content: center;
        gap: 30px;
    }
    .topic-list {
        /* transform: translate(-20%,0); */
        float: left;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .topic-list .operat {
        display: flex;
        justify-content: center;
    }

    .fixed-info {
        position: relative;
        float: left;
        width: 300px;
        height: 500px;
        margin-top: 30px;
    }

    .complate-list ul {
        /* border: 1px solid black; */
        padding: 0px;
    }

    .complate-list-item {
        display: inline-block;
        list-style-type: none;
        width: 20px;
        height: 20px;
        margin: 10px;
        padding: 5px;
        border-radius: 50%;
        text-align: center;
    }

    .noRight {
        color: #f56c6c;
        border: 1px solid #f56c6c;
    }
    .isRight {
        color: #67c23a;
        border: 1px solid #67c23a;
    }
</style>