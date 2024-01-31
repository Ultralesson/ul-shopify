import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Modal } from "react-native";
import { ICON_SIZE_MEDIUM } from "../../constants/sizes";

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
            }, 5000); // Displaying the toast message for duration of 5 seconds
        }

        return () => {
            clearTimeout(timer);
        };
    });

    return (
        <Modal transparent visible={alertModalState.status} accessible={false}>
            <View className="absolute bottom-8 right-2 w-11/12" accessible={false}>
                <View accessible={false}>
                    <View
                        accessible={false}
                        className="bg-white pt-5 pb-4 pl-5 pr-3 w-full shadow-md shadow-black rounded-xl flex-row items-center border-[0.1px] border-gray-500"
                    >
                        <View accessible={true} className="border h-10 mr-2" style={{ borderColor: "red" }}></View>
                        <InformationCircleIcon
                            accessible={true}
                            testID="icon-information"
                            size={ICON_SIZE_MEDIUM}
                            color={toastTemplate[alertModalState.type]?.color}
                        />
                        <View className="flex-row flex-1 justify-between ml-2 items-center" accessible={false}>
                            <View accessible={false}>
                                <Text accessible={true} testID="txt-toast-heading" className="font-bold">
                                    {toastTemplate[alertModalState.type]?.heading}
                                </Text>
                                <Text accessible={true} testID="txt-toast-message" className="text-gray-400">
                                    {alertModalState.text}
                                </Text>
                            </View>
                            <TouchableOpacity
                                accessible={true}
                                testID="btn-cross"
                                onPress={() => {
                                    dispatch(changeToastModalState({ status: false, text: null }));
                                }}
                            >
                                <XMarkIcon accessible={true} testID="icon-cross" color={"gray"} size={15} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default Toast;
