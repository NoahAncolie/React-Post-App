import React from "react";
import AppStore from "../../../components/Redux/AppStore";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CreatePost = () => {

    let jwtToken = useSelector(state => state.token)
    jwtToken = jwtToken ? jwtToken : AppStore.getState().state.token
    let user = useSelector(state => state.user)
    user = user ? user : AppStore.getState().state.user
    const navigate = useNavigate()

    const create = () => {
        let form = document.getElementById("login-form")
        let formData = new FormData(form)
        let datas = Object.fromEntries(formData)
        datas.user = user.id

        if (!datas.text) {
            window.alert("Il faut remplir le texte")
            return (0)
        }

        fetch('http://localhost:1337/posts', {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datas)
        }).then(() => {return navigate('/')})
    }

    return (
        <div className="front-body">
            {(user && user.username)?
                <div className="create-post inside-body">
                    <form onSubmit={event => { event.preventDefault(); create() }} id="login-form" className="form-container">
                        <textarea id="text" name="text" className="form-input" />
                        <input type="submit" value="Poster" className="form-input submit-btn" />
                    </form>
                </div> : <div className="error-404">Error 404 Not Found</div>}
        </div>
    )
}

export default CreatePost