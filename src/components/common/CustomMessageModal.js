import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Modal } from "react-native";
import * as Animatable from "react-native-animatable";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import { changeRegistrationModalState } from "../../store/slices/modalsSlice";

const CustomMessageModal = ({ gifOrImage, selector, resetState, typeOfMessage, messages }) => {
    const dispatch = useDispatch();
    const modalState = useSelector(selector);

    return (
        <Modal transparent visible={modalState}>
            <View
                className="flex-1 justify-center items-center"
                style={{ backgroundColor: "rgba(128, 128, 128, 0.5)" }}
            >
                <View className="bg-white rounded-xl">
                    <View className="mt-3 mr-5 flex-row justify-end">
                        <TouchableOpacity onPress={() => dispatch(resetState())}>
                            <XMarkIcon size="30" color="black" />
                        </TouchableOpacity>
                    </View>
                    <View className="rounded-lg pl-16 pr-16 pb-16">
                        <View className="flex-row justify-center">
                            {typeOfMessage === "success" && (
                                <Animatable.Image
                                    source={gifOrImage}
                                    animation="slideInUp"
                                    iterationCount={1}
                                    className="h-32 w-32 rounded-full"
                                />
                            )}

                            {/* Failed GIF */}
                        </View>
                        <View className="flex items-center">
                            {messages.map((message, index) => {
                                return (
                                    <Text key={index} className="mt-4">
                                        {message}
                                    </Text>
                                );
                            })}
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CustomMessageModal;