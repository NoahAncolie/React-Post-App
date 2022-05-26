import React from "react";
// import { useSetAtom, useAtom } from "jotai";
// import { JWT } from "../../components/Atoms";
// import { userAtom } from "../../components/Atoms";
import Cookies from "js-cookie";
import AppStore from "../../components/Redux/AppStore";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Login = () => {

    const navigate = useNavigate()
    const user = useSelector((state) => state.user)

    const prepUser = (datas) => {
        Cookies.set('jwt-token', datas.jwt, {
            sameSite: "None",
            secure: true
        })
        Cookies.set('user', JSON.stringify(datas.user), {
            sameSite: "None",
            secure: true
        })
        AppStore.dispatch({
            type: 'EDIT',
            newToken: datas.jwt,
            newUser: datas.user
        })
        return navigate('/')
    }

    const login = () => {
        let form = document.getElementById("login-form")
        let formData = new FormData(form)
        let datas = Object.fromEntries(formData)
        console.log(datas)
        fetch('http://localhost:1337/auth/local', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datas)
        }).then((data) => data.json())
            .then((datas) => prepUser(datas));
        console.log("yes")
    }

    return (
        <div className="front-body">
            {(user && user.username)? <div className="error-404">Error 404 Not Found</div> :
                <div className="login inside-body">
                    <form onSubmit={event => { event.preventDefault(); login() }} id="login-form" className="form-container">
                        <input type="text" placeholder="email ou username" id="identifier" name="identifier" className="form-input" />
                        <input type="password" placeholder="password" id="password" name="password" className="form-input" />
                        <input type="submit" value="Se connecter" className="form-input submit-btn" />
                    </form>
                </div>}
        </div>
    )
}

export default Login