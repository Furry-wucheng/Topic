<template>
    <div class="login">
        <el-card class="box-card">
            <form class="loginBox">
                <h1>登录</h1>
                <p>
                    账号：<el-input
                        style="width: 250px"
                        v-model="username"
                        placeholder="输入账号"
                    />
                </p>
                <p>
                    密码：<el-input
                        style="width: 250px"
                        type="password"
                        v-model="password"
                        placeholder="输入密码"
                        show-password
                    />
                </p>
                <el-button @click="toLogin">登录</el-button>
                <router-link to="/"><el-button>返回</el-button></router-link>
            </form>
        </el-card>
    </div>
</template>

<script setup>
    import { login } from "@/apis/user";
    import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
    const userStore = useUserStore();
    const router = useRouter();
    const username = ref("");
    const password = ref("");

    function toLogin() {
        ElMessage("登录中");
        login(username.value, password.value)
            .then((response) => {
                // console.log(response);
                if (response.isSuccess) {
                    userStore.isLogin = true;
                    userStore.userInfo = response.result;
                    //会话存储，保证刷新时不会丢失登录
                    sessionStorage.setItem('userInfo',JSON.stringify(response.result))
                    ElMessage({
                        type: "success",
                        message: "登录成功！",
                    });
                    router.replace('/')
                } else {
                    ElMessage({
                        type: "error",
                        message: "登录失败，用户名或密码错误",
                    });
                }
            })
            .catch((error) => {
                ElMessage({
                    type: "error",
                    // message:"登录失败，请检查网络配置"
                    message: error.message,
                });
            });
    }
</script>

<style scoped>
    .login {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }

    .box-card {
        padding: 30px;
        border: 1px solid #dcdfe6;
        width: 400px;
        height: 300px;
        /* transform: translate(0,-20%); */
        text-align: center;
    }

    .loginBox > * {
        margin: 25px;
    }
</style>