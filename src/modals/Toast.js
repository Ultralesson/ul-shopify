import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Modal } from "react-native";
import { ICON_COLOR, QUATERNARY_COLOR } from "../../constants/colors";
import { ICON_SIZE_LARGE, ICON_SIZE_MEDIUM, ICON_SIZE_SMALL, ICON_ULTRA_SMALL } from "../../constants/sizes";

import { useDispatch, useSelector } from "react-redux";

import { InformationCircleIcon, XMarkIcon } from "react-native-heroicons/outline";
import { changeToastModalState, selectToastModalState } from "../store/slices/modalsSlice";

const Toast = () => {
    const dispatch = useDispatch();
    const alertModalState = useSelector(selectToastModalState);

    const toastTemplate = {
        error: {
            color: "#ff7b7b",
            heading: "Uh oh, something went wrong",
        },
    };

    useEffect(() => {
        let timer = null;

        if (alertModalState.status) {
            timer = setTimeout(() => {
                dispatch(changeToastModalState({ status: false, text: null }));
            }, 4000);
        }

        return () => {
            clearTimeout(timer);
        };
    });

    console.log(alertModalState);

    return (
        <Modal transparent visible={alertModalState.status}>
            <View className="absolute bottom-8 right-2 w-11/12">
                <View>
                    <View className="bg-white pt-5 pb-4 pl-5 pr-3 w-full shadow-md shadow-black rounded-xl flex-row items-center border-[0.1px] border-gray-500">
                        <View className="border h-10 mr-2" style={{ borderColor: "red" }}></View>
                        <InformationCircleIcon
                            size={ICON_SIZE_MEDIUM}
                            color={toastTemplate[alertModalState.type]?.color}
                        />
                        <View className="flex-row flex-1 justify-between ml-2 items-center">
                            <View>
                                <Text className="font-bold">{toastTemplate[alertModalState.type]?.heading}</Text>
                                <Text className="text-gray-400">{alertModalState.text}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    dispatch(changeToastModalState({ status: false, text: null }));
                                }}
                            >
                                <XMarkIcon color={"gray"} size={15} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default Toast;
