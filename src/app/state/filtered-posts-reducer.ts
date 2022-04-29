import {usersAPI} from "../../api/api";
import {Post} from "./all-posts-reducer";
import {AxiosResponse} from "axios";
import {call, put} from "redux-saga/effects";

export type PostsType = Array<Post>
type FilteredPostsActionTypes = ReturnType<typeof getFilteredPostsAC> | ReturnType<typeof removePostsAC>

export const filteredPostsReducer = (state: PostsType = [], action: FilteredPostsActionTypes): PostsType => {
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


//Saga

export function* getFilteredPostsSaga(action: ReturnType<typeof getFilteredPosts>) {
    try {
        const res: AxiosResponse<PostsType> = yield call(usersAPI.getPostsByUser, action.userId)
        yield put(getFilteredPostsAC(res.data))
    }
    catch(error){
        console.error(error)
    }
}

export const getFilteredPosts = (userId: number) => ({type: 'GET-FILTERED-POSTS', userId}) as const