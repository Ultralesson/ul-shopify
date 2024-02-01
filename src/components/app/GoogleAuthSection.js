import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import useKeyboardStatus from "../../hooks/useKeyboardStatus";

const GoogleAuthSection = () => {
    const isKeyboardVisible = useKeyboardStatus();

    return (
        <>
            {!isKeyboardVisible && (
                <View accessible={false} className="flex items-center pb-1">
                    <View accessible={false} className="flex-row items-center mt-2">
                        <View
                            accessible={true}
                            className="border-[0.30px] border-solid w-1/3 item-center border-gray-400 mb-2 mr-2"
                        ></View>
                        <Text accessible={true} className="font-bold mb-3">
                            Or
                        </Text>
                        <View
                            accessible={true}
                            className="border-[0.30px] border-solid w-1/3 item-center border-gray-400 mb-2 ml-2"
                        ></View>
                    </View>
                    <View accessible={false} className="flex-row justify-start items-center">
                        <TouchableOpacity accessible={true}>
                            <Image
                                accessible={true}
                                source={require("../../../assets/icons/googleAuth.png")}
                                className="h-10 w-10"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    );
};

export default GoogleAuthSection;
