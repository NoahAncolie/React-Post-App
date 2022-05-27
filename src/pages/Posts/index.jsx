import React from "react";
import { useState, useEffect } from "react";
import Post from "./Post"
import { useSelector } from "react-redux";
import AppStore from "../../components/Redux/AppStore";

const Posts = () => {

    let jwtToken = useSelector(state => state.token)

    jwtToken = jwtToken ? jwtToken : AppStore.getState().state.token
    const [posts, setPosts] = useState({})

    useEffect(() => {
        fetch('http://localhost:1337/posts?_limit=20&_sort=created_at:desc', {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json'
            }
        }).then((data) => { return data.json() }).then((data) => setPosts(data))
    }, [jwtToken]);

    return (
        <div className="front-body post-div">
            <div className="frontPost">{Array.from(posts).map(post => (
                <Post post={post} key={post.id} />
            ))}</div>
        </div>
    )
}

export default Posts