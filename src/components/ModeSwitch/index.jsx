import React from "react";
import { useAtomValue } from "jotai";
import { darkModeAtom } from "../Atoms";
import DarkMode from "./darkMode";
import LightMode from "./lightMode";

const ModeSwitch = () => {

    const darkMode = useAtomValue(darkModeAtom)

    return (
        darkMode ? <DarkMode /> : <LightMode />
    )
}

export default ModeSwitch