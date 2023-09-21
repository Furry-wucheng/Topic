import http from '@/utils/http'

export const getExercises = (subject,userID) => {
    return http({
        url:'exercise',
        params:{
            subject,
            userID
        }
    })
}

export const sendAnswers = (answers) =>{
    return http.post('answers',answers)
}