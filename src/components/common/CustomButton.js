import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../../constants/colors";

const CustomButton = ({ text, disabled, navigateTo }) => {
    return (
        <TouchableOpacity className="ml-4 mr-4" onPress={navigateTo}>
            <Text
                className="text-lg font-bold text-center pt-3 pb-3 rounded-lg"
                style={{
                    backgroundColor: disabled ? SECONDARY_COLOR : PRIMARY_COLOR,
                    color: disabled ? "black" : "gray",
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
