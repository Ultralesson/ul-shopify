import React from "react";
import { View, Text, Image } from "react-native";
import useKeyboardStatus from "../../custom-hooks/useKeyboardStatus";
import { TouchableOpacity } from "react-native-gesture-handler";

const GoogleAuthSection = () => {
    const isKeyboardVisible = useKeyboardStatus();

    return (
        <>
            {!isKeyboardVisible && (
                <View className="flex items-center pb-1">
                    <View className="flex-row items-center mt-2">
                        <View className="border-[0.30px] border-solid w-1/3 item-center border-gray-400 mb-2 mr-2"></View>
                        <Text className="font-bold mb-3">Or</Text>
                        <View className="border-[0.30px] border-solid w-1/3 item-center border-gray-400 mb-2 ml-2"></View>
                    </View>
                    <View className="flex-row justify-start items-center">
                        <TouchableOpacity>
                            <Image source={require("../../assets/icons/googleAuth.png")} className="h-10 w-10" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    );
};

export default GoogleAuthSection;
