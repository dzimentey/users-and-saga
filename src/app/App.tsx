import React, {ChangeEvent, useEffect} from 'react'
import './App.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeUserStatusAC, getLocalUsersAC, getUsers, UsersType} from "./state/users-reducer";
import {PostsType} from "./state/all-posts-reducer";
import {getFilteredPosts, removePostsAC} from "./state/filtered-posts-reducer";
import {CommentsType, getComments} from "./state/coments-reducer";
import {debounce} from "@mui/material";
import {Filters} from "./state/Filters";


function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('localUsers') !== null) {
            getFromLocal()
        } else {
            dispatch(getUsers())
        }

    }, [])

    useEffect(() => {
        localStorage.setItem('localUsers', JSON.stringify(users))
    })

    const users = useSelector<AppRootStateType, UsersType>(state => state.users)
    //const allPosts = useSelector<AppRootStateType, PostsType>(state => state.allPosts)
    const filteredPosts = useSelector<AppRootStateType, PostsType>(state => state.filteredPosts)
    const comments = useSelector<AppRootStateType, CommentsType>(state => state.comments)

    const getPostsByUser = debounce((id: number, isChecked: boolean) => {
        if (!isChecked) {
            dispatch(removePostsAC(id))
            dispatch(changeUserStatusAC(id, isChecked))
        }
        else {
            dispatch(getFilteredPosts(id))
            dispatch(changeUserStatusAC(id, isChecked))
        }
    }, 500)

    const showCommentsHandler = debounce((postId: number) => {
             dispatch(getComments(postId))
    }, 500)

    const getFromLocal = () => {
        const localUsersJSON = localStorage.getItem('localUsers')
        if (localUsersJSON) {
            const localUsers: UsersType = JSON.parse(localUsersJSON)
            dispatch(getLocalUsersAC(localUsers))
            localUsers.forEach(u => u.isChecked && dispatch(getFilteredPosts(u.id)))
        }
    }

    return (
        <div className="App">
            <div className={'mainBlock'}>
                <div className={'postsBlock'}>

                    {filteredPosts.map(post => {
                        const onClickHandler = () => showCommentsHandler(post.id)

                        return(
                            <div key={post.id}>
                                <li>{post.title}</li>
                                <div style={{background: 'lightblue'}}>
                                    {post.body}
                                </div>
                                <button onClick={onClickHandler}>expand</button>
                                    <div style={{background: 'lightgray'}}>
                                    {comments.map(c => c.postId === post.id ? <p key={c.id}> {c.id} {c.body}</p> : '')}
                                    </div>
                            </div>
                        )
                    })}
                </div>

                <Filters users={users} getPostsByUser={getPostsByUser}/>

            </div>
        </div>
    )
}

export default App;
