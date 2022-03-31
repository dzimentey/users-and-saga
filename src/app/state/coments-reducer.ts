import {Dispatch} from "redux";
import {usersAPI} from "../../api/api";
import {AxiosResponse} from "axios";
import {call, put} from "redux-saga/effects";

export type Comment = {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

export type CommentsType = Array<Comment>
type ActionsType = ReturnType<typeof getCommentsAC>

export const commentsReducer = (state: CommentsType = [], action: ActionsType): CommentsType => {
    switch (action.type) {
        case "COMMENTS/GET-COMMENTS" :
            return [ ...action.comments]
        default:
            return state
    }
}

//AC creator

export const getCommentsAC = (comments: CommentsType) => ({type: 'COMMENTS/GET-COMMENTS', comments}) as const


//Saga

export function* getCommentsSaga(action: ReturnType<typeof getComments>) {
    try {
        const res: AxiosResponse<CommentsType> = yield call(usersAPI.getComments, action.postId)
        yield put(getCommentsAC(res.data))
    }
    catch(error){
        console.log(error)
    }
}

export const getComments = (postId: number) => ({type: 'GET-COMMENTS', postId}) as const


//Thunk
// export const getCommentsTC = (postId: number) => (dispatch: Dispatch) => {
//     usersAPI.getComments(postId)
//         .then((res) => {
//             dispatch(getCommentsAC(res.data))
//         })
//         .catch((error) => {
//                 console.log(error)
//             }
//         )
// }