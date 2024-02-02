import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

const CustomBackButton = ({ onBackPress }) => {
    return (
        <TouchableOpacity
            accessible={true}
            testID={Platform.OS === "android" ? "com.ultralesson.ulshopify:id/btn-back" : "btn-back"}
            onPress={onBackPress}
        >
            <ChevronLeftIcon class size={30} color="black" />
        </TouchableOpacity>
    );
};

export default CustomBackButton;
