import React from "react";
import {PostsType} from "./state/all-posts-reducer";
import {CommentsType} from "./state/coments-reducer";

type PostsPropsType = {
    filteredPosts: PostsType
    getCommentsHandler: (id: number) => () => void
    comments: CommentsType
}

export const Posts = React.memo((props: PostsPropsType) => {

    const {filteredPosts, getCommentsHandler, comments} = props
    console.log('Posts')
    return (
        <div className={'postsBlock'}>

            {filteredPosts.map(post => {
                return (
                    <div key={post.id}>
                        <li>{post.title}</li>
                        <div style={{background: 'lightblue'}}>
                            {post.body}
                        </div>
                        <button onClick={getCommentsHandler(post.id)}>expand</button>
                        <div style={{background: 'lightgray'}}>
                            {comments.map(c => c.postId === post.id ? <p key={c.id}> {c.id} {c.body}</p> : '')}
                        </div>
                    </div>
                )
            })}
        </div>
    )
})