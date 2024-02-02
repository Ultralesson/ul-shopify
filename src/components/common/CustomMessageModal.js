import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { Modal } from "react-native";
import * as Animatable from "react-native-animatable";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";

const CustomMessageModal = ({ gifOrImage, selector, resetState, typeOfMessage, messages }) => {
    const dispatch = useDispatch();
    const modalState = useSelector(selector);

    return (
        <Modal
            accessible={false}
            testID={Platform.OS === "android" ? "com.ultralesson.ulshopify:id/modal-message" : "modal-message"}
            transparent
            visible={modalState}
        >
            <View
                accessible={false}
                className="flex-1 justify-center items-center"
                style={{ backgroundColor: "rgba(128, 128, 128, 0.5)" }}
            >
                <View className="bg-white rounded-xl" accessible={false}>
                    <View className="mt-3 mr-5 flex-row justify-end" accessible={false}>
                        <TouchableOpacity
                            accessible={true}
                            testID={
                                Platform.OS === "android"
                                    ? "com.ultralesson.ulshopify:id/btn-modal-cross"
                                    : "btn-modal-cross"
                            }
                            onPress={() => dispatch(resetState())}
                        >
                            <XMarkIcon size="30" color="black" />
                        </TouchableOpacity>
                    </View>
                    <View className="rounded-lg pl-16 pr-16 pb-16" accessible={false}>
                        <View className="flex-row justify-center" accessible={false}>
                            {typeOfMessage === "success" && (
                                <Animatable.Image
                                    accessible={true}
                                    testID={
                                        Platform.OS === "android"
                                            ? "com.ultralesson.ulshopify:id/img-modal"
                                            : "img-modal"
                                    }
                                    source={gifOrImage}
                                    animation="slideInUp"
                                    iterationCount={1}
                                    className="h-32 w-32 rounded-full"
                                />
                            )}
                        </View>
                        <View className="flex items-center" accessible={false}>
                            {messages.map((message, index) => {
                                return (
                                    <Text
                                        accessible={true}
                                        testID={
                                            Platform.OS === "android"
                                                ? "com.ultralesson.ulshopify:id/txt-modal-message"
                                                : "txt-modal-message"
                                        }
                                        key={index}
                                        className="mt-4"
                                    >
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
