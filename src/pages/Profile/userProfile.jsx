import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppStore from '../../components/Redux/AppStore';

const UserProfile = () => {

    let jwtToken = useSelector(state => state.token)
    jwtToken = jwtToken ? jwtToken : AppStore.getState().state.token
    const userId = useParams().id
    const [user, setUser] = useState({})

    useEffect(() => {
        fetch(`http://localhost:1337/users/${userId}`, {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json'
            }
        }).then((data) => { return data.json() }).then((data) => setUser(data))
    }, [jwtToken, userId]);

    return (
        <div className="front-body">
            <div className='inside-body' style={{textAlign: "center"}}>
                <h1>{user.username}</h1>
                <br />
                <p>{`${user.email}`}</p>
            </div>
        </div>
    )
}

export default UserProfile