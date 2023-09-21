<template>
    <div class="analyse-main">
        <chart-card></chart-card>
        <el-card class="answer-history-card">
            <template #header>
                <div class="card-header">
                    <span>答题历史</span>
                </div>
            </template>
            <template v-for="history in historyList" :key="history.exerciseID">
                <router-link :to="{path:`history/${history.exerciseID}`}">
                    <button class="link">
                        {{ history.subject }}第{{ history.times }}次测试
                        <span class="right-show">{{ history.date }}</span>
                    </button>
                </router-link>
                <el-divider />
                <el-scrollbar />
            </template>
        </el-card>
    </div>
</template>

<script setup>
    import { getAnswerHistoryList } from "@/apis/analyse";
import { useUserStore } from "@/stores/userStore";
    import ChartCard from './components/ChartCard.vue'
    const userStore = useUserStore()

    const historyList = ref();

    //获取答题历史列表
    const getHistoryList = async () => {
        const res = await getAnswerHistoryList(userStore.userInfo.userID);
        historyList.value = res.result.historyList;
        // console.log(historyList.value);
    };

    onMounted(async () => {
        getHistoryList();
    });
</script>

<style scoped>
    .analyse-main {
        display: flex;
        /* border: 1px solid black; */
        justify-content: center;
        gap: 30px;
        /* align-items: center; */
        height: 100%;
    }



    .el-divider--horizontal {
        margin: 10px 0px;
    }

    .link {
        width: 100%;
        border: none;
        padding: 10px;
        background-color: transparent;
        text-align: left;
    }

    .link:hover {
        background-color: #ecf5ff;
        color: #049eff;
        cursor: pointer;
    }

    .right-show {
        float: right;
        color: #0000004e;
    }

    .answer-history-card {
        width: 300px;
        height: 400px;
    }
</style>