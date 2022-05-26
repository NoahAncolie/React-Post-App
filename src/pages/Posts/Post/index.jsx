import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import AppStore from "../../../components/Redux/AppStore";
import { useSelector } from "react-redux";

const Post = ({ post }) => {

    let jwtToken = useSelector(state => state.token)
    jwtToken = jwtToken ? jwtToken : AppStore.getState().state.token
    let user = useSelector(state => state.user)
    user = user ? user : AppStore.getState().state.user
    const [deleted, setDelete] = useState(false)
    const [likes, setLikes] = useState(post.like)
    const [unlike, setLiking] = useState(Array.from(post.users_likes).filter(likeUser => likeUser.id === user.id).length > 1 ? true : false)

    useEffect(() => {
        fetch(`http://localhost:1337/posts/${post.id}`, {
            method: 'put',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ like: likes })
        })
    }, [unlike, jwtToken, likes, post.id])

    const toggleLike = () => {
        unlike ? setLikes(likes - 1) : setLikes(likes + 1)
        setLiking(!unlike)
    }

    const deletePost = () => {
        fetch(`http://localhost:1337/posts/${post.id}`, {
            method: 'delete',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ like: likes })
        })
        setDelete(true)
    }

    return (
        <>{deleted ? <></> :
            <div className="post">
                <Link to={`/user/${post.user.id}`} className="post-name">{post.user.username}</Link>
                <br /><br />
                <div className="post-content">
                    <p>{post.text}</p>
                    {user.id === post.user.id ? <a href="/" onClick={event => { event.preventDefault(); deletePost() }} className={"heart-on like-link"}>Delete</a> : <a href="/" onClick={event => { event.preventDefault(); toggleLike() }} className={unlike ? "heart-on like-link" : "heart-off like-link"}>{likes} Likes</a>}
                </div>
            </div >
        }
        </>
    )
}

export default Post