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
    const [cleanedLikesArray, setClean] = useState(post.users_likes.filter(item => item.id !== user.id))
    const [likes, setLikes] = useState(post.like)
    const [unlike, setLiking] = useState(Array.from(post.users_likes).filter(likeUser => likeUser.id === user.id).length > 0 ? true : false)
    
    useEffect(() => {
        fetch(`http://localhost:1337/posts/${post.id}`, {
            method: 'put',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ like: likes, users_likes: cleanedLikesArray })
        })
        console.log(post)
    }, [likes, jwtToken, post, user, unlike])

    const toggleLike = () => {
        setClean(post.users_likes.filter(item => item.id !== user.id))
        unlike ? setLikes(likes - 1) : setLikes(likes + 1)
        unlike ? setClean(cleanedLikesArray) : setClean(cleanedLikesArray.push(user))
        setLiking(!unlike)
    }

    return (
        <div className="post">
            <Link to={`/user/${post.user.id}`} className="post-name">{post.user.username}</Link>
            <br /><br />
            <div className="post-content">
                <p>{post.text}</p>
                <a href="/" onClick={event => {event.preventDefault(); toggleLike()}} className={unlike ? "heart-on like-link" : "heart-off like-link"}>{likes} Likes</a>
            </div>
        </div >
    )
}

export default Post