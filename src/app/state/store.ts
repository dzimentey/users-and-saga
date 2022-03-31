import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import {getUsersSaga, usersReducer} from "./users-reducer";
import {allPostsReducer} from "./all-posts-reducer";
import {filteredPostsReducer, getFilteredPostsSaga} from "./filtered-posts-reducer";
import {commentsReducer, getCommentsSaga} from "./coments-reducer";
import createSagaMiddleware from 'redux-saga'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    users: usersReducer,
    allPosts: allPostsReducer,
    filteredPosts: filteredPostsReducer,
    comments: commentsReducer,
})

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));

sagaMiddleware.run(rootWatcher)

function* rootWatcher() {
    yield takeEvery('GET-USERS', getUsersSaga)
    yield takeEvery('GET-FILTERED-POSTS', getFilteredPostsSaga)
    yield takeEvery('GET-COMMENTS', getCommentsSaga)
}

