import React from "react";
import {createRoot} from 'react-dom/client'
import Routeur from "./components/Router";
import AppStore from "./components/Redux/AppStore";
import { Provider } from 'react-redux'
import "./styles/main.scss"

const App = () => {
    return (
        <Provider store={AppStore}>
            <Routeur />
        </Provider>
    )
}

createRoot(document.getElementById('root')).render(<App />)