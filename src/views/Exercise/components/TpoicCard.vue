<template>
    <el-card class="box-card">
        <div>{{ index + 1 }}、{{ topicDesc }}</div>
        <!-- 题目图片 -->
        <el-image lazy :src="topicImg">
            <template #error>
                <div class="image-slot">
                    <el-icon size="40"><Picture /></el-icon>
                </div>
            </template>
        </el-image>
        <div>
            <template v-if="topicType == 0">
                <el-radio-group ref="choose" v-model="answer.optition">
                    <el-radio label="A" size="large" border>A</el-radio>
                    <el-radio label="B" size="large" border>B</el-radio>
                    <el-radio label="C" size="large" border>C</el-radio>
                    <el-radio label="D" size="large" border>D</el-radio>
                </el-radio-group>
            </template>
            <template v-else-if="topicType == 1">
                <el-input v-model.lazy="answer.text[0]" placeholder="步骤一" />
                <el-input v-model.lazy="answer.text[1]" placeholder="步骤二" />
                <el-input v-model.lazy="answer.text[2]" placeholder="步骤三" />
                <el-input v-model.lazy="answer.text[3]" placeholder="步骤四" />
            </template>
        </div>
    </el-card>
</template>

<script setup>
    import { Picture } from "@element-plus/icons-vue";
    const { exercise } = defineProps(["exercise", "index"]);
    const $attrs = useAttrs();

    const { topicType, topicDesc, topicImg } = toRefs(exercise);

    //初始化题目答题信息
    const answer = ref({});
    //将题目答题信息放入ref中
    answer.value.topicID = exercise.topicID;
    if (topicType.value == 0) {
        answer.value.optition = "";
    } else if (topicType.value == 1) {
        answer.value.text = ["", "", "", ""];
    }
    //计算本题是否答题完成
    const isComplate = computed(() => {
        if (topicType.value == 0) {
            return answer.value.optition != "";
        } else {
            let text = answer.value.text;
            for (let index = 0; index < text.length; index++) {
                if (text[index].trim() != "") {
                    //当出现一个不为空的格子返回为ture
                    return true;
                }
            }
            return false;
        }
    });

    onMounted(() => {
        //将计算属性放入答题信息
        answer.value.isComplate = isComplate;
        $attrs.answers.push(answer.value);
    });
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