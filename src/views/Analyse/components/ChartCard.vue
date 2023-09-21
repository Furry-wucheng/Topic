<template>
    <el-card class="echarts">
        <div ref="echartsMain" style="width: 500px; height: 400px"></div>
    </el-card>
</template>

<script setup>
    import * as echarts from "echarts";

    const echartsMain = ref();

    function drawEcharts() {
        let myChart = echarts.init(echartsMain.value);

        myChart.setOption({
            color: ["#409eff"],
            title: {
                text: "历史答题分析",
            },
            tooltip: {},
            xAxis: {
                data: [],
            },
            yAxis: {
                type:'value',
                name:"熟练程度"
            },
            series: [
                {
                    name: "熟练程度",
                    type: "value",
                    data: [],
                },
            ],
        });

        setTimeout(() => {
            myChart.showLoading();
        }, 500);

        setTimeout(() => {
            myChart.setOption({
                xAxis: {
                    type:"category",
                    data: [
                        "章节一",
                        "章节二",
                        "章节三",
                        "章节四",
                        "章节五",
                        "章节六",
                    ],
                },
                series: [
                    {
                        name: "熟练程度",
                        type: "bar",
                        data: [5, 2, 3, 9, 7, 4],
                        nameLocation:"end"
                    },
                ],
            });
            myChart.hideLoading();
        }, 3000);
    }

    onMounted(() => {
        drawEcharts();
    });
</script>

<style scoped>
    .echarts {
        width: 500px;
        height: 400px;
    }
</style>