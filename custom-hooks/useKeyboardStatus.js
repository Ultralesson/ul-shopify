import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

const useKeyboardStatus = () => {
    const [keyboardStatus, setKeyboardStatus] = useState(false);

    useEffect(() => {
        const keyDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardStatus(true);
        });

        const keyDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardStatus(false);
        });

        return () => {
            keyDidShowListener.remove();
            keyDidHideListener.remove();
        };
    });
    return keyboardStatus;
};

export default useKeyboardStatus;
