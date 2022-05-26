import { legacy_createStore } from "@reduxjs/toolkit";
import { AppReducer } from "./AppReducer";

const AppStore = legacy_createStore(AppReducer)

export default AppStore