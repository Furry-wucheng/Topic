import http from '@/utils/http'

export const getAnswerHistoryList = (userID) => {
    return http({
        url:'answerHistoryList',
        params:{
            userID
        }
    })
}

export const getAnswerHistoryByExeciseID = (exerciseID)=>{
    return http({
        url:"answerHistory",
        params:{
            exerciseID
        }
    })
}