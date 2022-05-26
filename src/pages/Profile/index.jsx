import React from 'react'
import { Link, Routes, Route } from 'react-router-dom';
import AppStore from '../../components/Redux/AppStore';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {

    let jwtToken = useSelector(state => state.token)
    jwtToken = jwtToken ? jwtToken : AppStore.getState().state.token
    let user = useSelector(state => state.user)
    user = user ? user : AppStore.getState().state.user
    const navigate = useNavigate()

    const edit = () => {
        let form = document.getElementById("edit-form")
        let formData = new FormData(form)
        let datas = Object.fromEntries(formData)

        if (!(datas.username && datas.description)) {
            window.alert('Les champs doivent êtres remplis.')
            return (0)
        }

        fetch(`http://localhost:1337/users/${user.id}`, {
            method: 'put',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json'
            }, body: JSON.stringify(datas)
        }).then((response) => { return response.json() })
            .then((response) => AppStore.dispatch({
                type: 'EDIT',
                newToken: jwtToken,
                newUser: response
            }));
        navigate("/profile")
    }
    return (
        <> {(user && user.username) ?
            <div className="front-body">
                <div className='inside-body'>
                    <br />
                    <div style={{ width: "100%", textAlign: "center" }} I>
                        <h1>{user.username}</h1>
                        <br />
                        <p>{user.description}</p>
                        <br /><br />
                        <Link to="/profile/edit">Modifier</Link>
                    </div>
                    <br />
                    <Routes>
                        <Route path='/edit' element={<form className="form-container" id="edit-form" onSubmit={event => { event.preventDefault(); edit() }}>
                            <input type="text" placeholder="New Name" id="username" name="username" className='form-input' />
                            <textarea type="text" placeholder="New Description" id="description" name="description" className='form-input' />
                            <input type="submit" value="edit the user" className='form-input submit-btn' />
                        </form>} />
                    </Routes>
                </div>
            </div> :
            <div>Error 404 not Found</div>
        }
        </>
    )
}

export default Profile