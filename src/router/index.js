import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Analyse from '@/views/Analyse/index.vue'
import Exercise from '@/views/Exercise/index.vue'
import History from '@/views/History/index.vue'


const routes = [
  {
    path: '/',
    component: Layout,
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore();
      if (userStore.isLogin) {
        next()
      } else {
        ElMessage({
          type: "warning",
          message: "请先登录"
        })
        next('/login')
      }
    },
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: 'analyse',
        component: Analyse
      },
      {
        path: 'exercise/:subject',
        component: Exercise,
        // 登录判断
      },
      {
        path: 'history/:exerciseID',
        component: History
      },

    ],
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 };
    },
  },
  {
    path: '/login',
    component: Login,
    beforeEnter(to, from, next) {
      const userStore = useUserStore();
      if (userStore.isLogin) {
        next('/')
      } else {
        next()
      }
    }
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})