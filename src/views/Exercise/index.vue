<template>
    <div class="exercise-main">
        <div class="topic-list">
            <TopicCard
                v-for="(exercise, index) in exerciseList"
                :key="exercise.topicID"
                :index="index"
                :exercise="exercise"
                :answers="answer.answers"
                >{{ console.log(exercise, index) }}</TopicCard
            >
            <div class="operat">
                <ElButton @click="commit">提交</ElButton>
            </div>
        </div>
        <el-card
            v-show="width > 1120"
            class="fixed-info"
            :style="{ top: `${y}px` }"
        >
            <template #header>
                <div class="card-header">
                    <span>完成情况</span>
                    <el-button @click="commit" style="float: right"
                        >提交</el-button
                    >
                </div>
            </template>
            <div class="complate-list">
                <ul>
                    <li
                        v-for="(complate, index) in answer.answers"
                        :key="complate.topicID"
                        class="complate-list-item"
                        :class="{
                            noFinish: !complate.isComplate,
                            isFinish: complate.isComplate,
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
    import { getExercises, sendAnswers } from "@/apis/exercise";
    import { useUserStore } from "@/stores/userStore";

    const route = useRoute();
    const router = useRouter();
    const userStore = useUserStore();
    //控制侧滑栏用到的参数
    const { y } = useScroll(window);
    const { width } = useWindowSize();

    //发送请求携带科目
    const subject = ref(route.params.subject);

    //准备的空题目数组
    const exerciseList = ref([]);
    //准备空答案
    const answer = ref({
        exerciseID: "",
        answers: [],
    });
    //获取题目
    const getExercisesList = async () => {
        //获取题目列表
        const res = await getExercises(subject.value, userStore.userInfo.userID)
        .catch(()=>{
            ElMessage({
                type:'error',
                message:'获取题目失败，请稍后重试'
            })
            router.replace('/')
        });
        //将本次答题ID填入答案信息中
        answer.value.exerciseID = res.result.exerciseID;
        //将信息填入题目列表中
        exerciseList.value = res.result.exerciseList;
    };

    //提交
    function commit() {
        //弹出提示
        ElMessageBox.confirm("确认要提交吗，请检查是否有未完成的题目", "提示信息", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
        }).then(() => {
            ElMessage({
                message: h("span", null, "提交中……"),
            });
            //发送答案
            sendAnswers(JSON.parse(JSON.stringify(answer.value)))
                .then((response) => {
                    ElMessage({
                        type: "success",
                        message: "提交成功",
                    });
                    router.replace({ path: "/" });
                })
                .catch((error) => {
                    ElMessage({
                        type: "error",
                        message: "提交失败，请稍后重试",
                        // message:error.message
                    });
                });
            // console.log(JSON.parse(JSON.stringify(answer.value)));
        });
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

    .noFinish {
        color: #dcdfe6;
        border: 1px solid #dcdfe6;
    }
    .isFinish {
        color: #409eff;
        border: 1px solid #409eff;
    }
</style>