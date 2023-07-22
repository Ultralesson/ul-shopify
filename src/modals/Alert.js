import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Modal } from "react-native";
import { QUATERNARY_COLOR } from "../../constants/colors";
import { ICON_SIZE_SMALL } from "../../constants/sizes";

import { useDispatch, useSelector } from "react-redux";

import { XMarkIcon } from "react-native-heroicons/outline";
import { changeAlertModalState, selectAlertModalState } from "../store/slices/modalsSlice";

const Alert = () => {
    const dispatch = useDispatch();
    const alertModalState = useSelector(selectAlertModalState);

    useEffect(() => {
        let timer = null;

        if (alertModalState.status) {
            timer = setTimeout(() => {
                dispatch(changeAlertModalState({ status: false, text: null }));
            }, 4000);
        }

        return () => {
            clearTimeout(timer);
        };
    });

    return (
        <Modal transparent visible={alertModalState.status}>
            <View className="absolute bottom-8 right-2 w-11/12">
                <View className="bg-white pt-6 pb-6 pl-10 pr-3 w-full shadow-md shadow-black rounded-xl flex-row items-center justify-between border-[0.23px] border-gray-500">
                    <Text className="text-right" style={{ color: QUATERNARY_COLOR }}>
                        {alertModalState.text}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            dispatch(changeAlertModalState({ status: false, text: null }));
                        }}
                    >
                        <XMarkIcon color={"red"} size={ICON_SIZE_SMALL} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default Alert;
