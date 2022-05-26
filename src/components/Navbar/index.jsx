import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import AppStore from '../Redux/AppStore'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    let user = useSelector((state) => state.user)
    user = user ? user : AppStore.getState().state.user

    const navigate = useNavigate()


    const disconnect = () => {
        Cookies.remove('jwt-token', {
            sameSite: "None",
            secure: true
        })
        Cookies.remove('user', {
            sameSite: "None",
            secure: true
        })
        AppStore.dispatch({
            type: 'EDIT'
        })
        return navigate('/')
    }

    return (
        <nav>
            <Link to="/">Home</Link>
            {(user && user.username) ?
                <>
                    <Link to="/profile/*">Profil</Link>
                    <Link to="/create-post">Créer un post</Link>
                    <a href="/" onClick={event => { event.preventDefault(); disconnect() }}>Disconnect</a>
                </> :
                <>
                    <Link to="/login">Se connecter</Link>
                    <Link to="/register">S'inscrire</Link>
                </>}
            {(user && user.username) ? <p>{user.username}</p> : <></>}
        </nav>
    )
}

export default Navbar