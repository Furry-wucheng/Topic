import { defineStore } from "pinia";

export const useUserStore = defineStore('user',{
    state:()=>{
        return {
            isLogin:false,
            userInfo:{
                userID:'',
                username:'',
            }
        }
    },
    actions:{
        logout(){
            //重置值
            this.$reset()
            sessionStorage.removeItem('userInfo')
        }
    }

})