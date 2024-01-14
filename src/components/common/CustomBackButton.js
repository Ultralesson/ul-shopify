import React from "react";
import { TouchableOpacity } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

const CustomBackButton = ({ onBackPress }) => {
    return (
        <TouchableOpacity testID="btn-back" accessibilityLabel="btn-back" nativeID="btn-back" onPress={onBackPress}>
            <ChevronLeftIcon class size={30} color="black" />
        </TouchableOpacity>
    );
};

export default CustomBackButton;
