import {Dispatch} from "redux";
import {usersAPI} from "../../api/api";
import {Post} from "./all-posts-reducer";
import {AxiosResponse} from "axios";
import {call, put} from "redux-saga/effects";

export type PostsType = Array<Post>
type ActionsType = ReturnType<typeof getFilteredPostsAC> | ReturnType<typeof removePostsAC>

export const filteredPostsReducer = (state: PostsType = [], action: ActionsType): PostsType => {
    switch (action.type) {
        case "FILTERED-POSTS/GET-POSTS-BY-USER":
            return [...state, ...action.posts]
        case "FILTERED-POSTS/REMOVE-POSTS-BY-USER":
            return state.filter(post => post.userId !== action.userId)
        default:
            return state
    }
}

//AC creator

export const getFilteredPostsAC = (posts: PostsType) => ({type: 'FILTERED-POSTS/GET-POSTS-BY-USER', posts}) as const
export const removePostsAC = (userId: number) => ({type: 'FILTERED-POSTS/REMOVE-POSTS-BY-USER', userId}) as const

//Thunk

// export const getFilteredPostsTC = (userId: number) => async (dispatch: Dispatch) => {
//     try {
//         const res: AxiosResponse<PostsType> = await usersAPI.getPostsByUser(userId)
//         dispatch(getFilteredPostsAC(res.data))
//     } catch (error) {
//         console.log(error)
//     }
// }

//Saga

export function* getFilteredPostsSaga(action: ReturnType<typeof getFilteredPosts>) {
    try {
        const res: AxiosResponse<PostsType> = yield call(usersAPI.getPostsByUser, action.userId)
        yield put(getFilteredPostsAC(res.data))
    }
    catch(error: any){
        console.log(error.message)
    }
}

export const getFilteredPosts = (userId: number) => ({type: 'GET-FILTERED-POSTS', userId}) as const