import React from "react";
import { TouchableOpacity } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

const CustomBackButton = ({ onBackPress }) => {
    return (
        <TouchableOpacity accessible={true} testID="btn-back" onPress={onBackPress}>
            <ChevronLeftIcon class size={30} color="black" />
        </TouchableOpacity>
    );
};

export default CustomBackButton;
