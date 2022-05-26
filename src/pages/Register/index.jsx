import React from "react";
import AppStore from "../../components/Redux/AppStore";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Register = () => {

    const navigate = useNavigate()
    let user = useSelector((state) => state.user)
    user = user ? user : AppStore.getState().state.user

    const register = () => {
        let form = document.getElementById("register-form")
        let formData = new FormData(form)
        let datas = Object.fromEntries(formData)

        fetch('http://localhost:1337/auth/local/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datas)
        }).then((data) => data.json())
            .then((datas) => console.log(datas));
        return navigate('/')
    }

    return (
        <div className="front-body"> {(user && user.username) ? <div>Error 404 not Found</div> :
            <div className="register inside-body">
                <form onSubmit={event => { event.preventDefault(); register() }} id="register-form" className="form-container">
                    <input type="text" placeholder="username" id="username" name="username" className="form-input" />
                    <input type="text" placeholder="email" id="email" name="email" className="form-input" />
                    <input type="password" placeholder="password" id="password" name="password" className="form-input" />
                    <input type="submit" value="S'inscrire" className="form-input submit-btn" />
                </form>
            </div>}
        </div>
    )
}

export default Register