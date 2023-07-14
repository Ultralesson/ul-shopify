import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Modal } from "react-native";
import { SECONDARY_COLOR } from "../../../constants/colors";

import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { changeQuitActionModal } from "../../store/slices/modalsSlice";

const CustomQuitActionModal = ({ selector, positiveActonText, negativeActionText }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const modalState = useSelector(selector);

    const QUIT_MODAL = {
        QUESTION: "txt-quit-modal-question",
        YES_BUTTON: "btn-quit-modal-yes",
        NO_BUTTON: "btn-quit-modal-no",
    };

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
                                testID={QUIT_MODAL.QUESTION}
                                accessibilityLabel={QUIT_MODAL.QUESTION}
                                className="text-center"
                            >
                                {modalState.question}
                            </Text>
                        </View>
                    </View>
                    <View className="flex-row gap-3">
                        <Text
                            testID={QUIT_MODAL.YES_BUTTON}
                            accessibilityLabel={QUIT_MODAL.YES_BUTTON}
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
                                testID={QUIT_MODAL.NO_BUTTON}
                                accessibilityLabel={QUIT_MODAL.NO_BUTTON}
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
