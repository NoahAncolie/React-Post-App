import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../Navbar";
import Register from "../../pages/Register";
import Login from "../../pages/Login";
import Profile from "../../pages/Profile";
import Posts from "../../pages/Posts";
// import { useAtomValue } from "jotai";
// import { userAtom } from "../Atoms";
import UserProfile from "../../pages/Profile/userProfile";
import CreatePost from "../../pages/Posts/Post/create";
import { useSelector } from "react-redux";
import AppStore from "../Redux/AppStore";
import { useEffect } from "react";

const Routeur = () => {

    let user = useSelector((state) => state.user)
    user = user ? user : AppStore.getState().state.user
    
    useEffect(() => {
        AppStore.subscribe(() => console.log(user))
    }, [user])

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={(user && user.username) ? <Posts /> : <div className="front-body"><div className="inside-body"><h2>Connectez-vous pour accéder aux posts</h2></div></div>} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile/*" element={<Profile />} />
                <Route path="/user/:id" element={<UserProfile />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/*" element={<p>ERROR 404 FDP</p>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routeur