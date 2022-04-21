import React, {useCallback, useEffect} from 'react'
import './App.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeUserStatusAC, getLocalUsersAC, getUsers, UsersType} from "./state/users-reducer";
import {PostsType} from "./state/all-posts-reducer";
import {getFilteredPosts, removePostsAC} from "./state/filtered-posts-reducer";
import {CommentsType, getComments} from "./state/coments-reducer";
import {debounce} from "@mui/material";
import {Filters} from "./state/Filters";
import {Posts} from "./Posts";


const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('localUsers') !== null) {
            getFromLocal()
        } else {
            dispatch(getUsers())
        }

    }, [])

    useEffect(() => {
        localStorage.setItem('localUsers', JSON.stringify(users)) // Set items to local storage during each rendering
    })

    const users = useSelector<AppRootStateType, UsersType>(state => state.users)
    //const allPosts = useSelector<AppRootStateType, PostsType>(state => state.allPosts)
    const filteredPosts = useSelector<AppRootStateType, PostsType>(state => state.filteredPosts)
    const comments = useSelector<AppRootStateType, CommentsType>(state => state.comments)
    const getFilteredPostsHandler = debounce((userId: number) => {
        dispatch(getFilteredPosts(userId))
    }, 500)

    const getPostsByUser = useCallback((id: number, isChecked: boolean) => {
        if (!isChecked) {
            dispatch(removePostsAC(id))
            dispatch(changeUserStatusAC(id, isChecked))
        }
        else {
            //dispatch(getFilteredPosts(id))
            getFilteredPostsHandler(id)
            dispatch(changeUserStatusAC(id, isChecked))
        }
    },  [])

    const getCommentsHandler = useCallback((postId: number) => () => dispatch(getComments(postId)),[])

    const getFromLocal = () => {
        const localUsersJSON = localStorage.getItem('localUsers')
        if (localUsersJSON) {
            const localUsers: UsersType = JSON.parse(localUsersJSON)
            dispatch(getLocalUsersAC(localUsers))
            localUsers.forEach(u => u.isChecked && dispatch(getFilteredPosts(u.id)))
        }
    }

        console.log('App')

    return (
        <div className="App">
            <div className={'mainBlock'}>
                <Posts filteredPosts={filteredPosts} getCommentsHandler={getCommentsHandler} comments={comments}/>
                <Filters users={users} getPostsByUser={getPostsByUser}/>

            </div>
        </div>
    )
}

export default App;
