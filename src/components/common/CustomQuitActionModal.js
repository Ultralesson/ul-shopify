import React from "react";
import { Text, View } from "react-native";
import { Modal } from "react-native";
import { SECONDARY_COLOR } from "../../../constants/colors";

import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { changeQuitActionModal } from "../../store/slices/modalsSlice";

const CustomQuitActionModal = ({ selector, positiveActonText, negativeActionText }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const modalState = useSelector(selector);

    return (
        <Modal transparent visible={modalState.status}>
            <View
                className="flex-1 justify-center items-center"
                style={{ backgroundColor: "rgba(128, 128, 128, 0.5)" }}
            >
                <View className="bg-white rounded-xl p-12 pt-5 shadow-md shadow-black">
                    <View className="mt-3 mr-5 flex-row justify-end">
                        <View className="flex-row items-center justify-center pb-5">
                            <Text
                                testID="txt-quit-modal-question"
                                accessibilityLabel="txt-quit-modal-question"
                                nativeID="txt-quit-modal-question"
                                className="text-center"
                            >
                                {modalState.question}
                            </Text>
                        </View>
                    </View>
                    <View className="flex-row gap-3">
                        <Text
                            testID="btn-quit-modal-yes"
                            accessibilityLabel="btn-quit-modal-yes"
                            nativeID="btn-quit-modal-yes"
                            onPress={() => {
                                dispatch(changeQuitActionModal({ question: null, status: false, screen: null }));
                                navigation.navigate(modalState.screen);
                            }}
                            className="pl-9 pr-9 pt-2 pb-2 rounded-lg"
                            style={{ backgroundColor: SECONDARY_COLOR }}
                        >
                            {positiveActonText}
                        </Text>
                        <View className="bg-white shadow-sm shadow-black rounded-lg">
                            <Text
                                testID="btn-quit-modal-no"
                                accessibilityLabel="btn-quit-modal-no"
                                nativeID="btn-quit-modal-no"
                                onPress={() => {
                                    dispatch(changeQuitActionModal({ question: null, status: false, screen: null }));
                                }}
                                className="pl-9 pr-9 pt-2 pb-2 rounded-lg"
                            >
                                {negativeActionText}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CustomQuitActionModal;
