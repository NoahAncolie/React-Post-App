import { atom } from "jotai";
import Cookies from "js-cookie";

export const darkModeAtom = atom(localStorage.darkMode ? JSON.parse(localStorage.darkMode) : JSON.parse(localStorage.darkMode = "false"))

export const JWT = Cookies.get('jwt-token') ? atom(Cookies.get('jwt-token')) : atom("")

export const userAtom = Cookies.get('jwt-token') ?  atom(fetch('http://localhost:1337/users/me', {
    method: 'get',
    headers: {
        'Authorization': `Bearer ${Cookies.get('jwt-token')}`,
        'Content-Type': 'application/json'
    }
}).then((answer) => {return answer.json()})) : atom({})