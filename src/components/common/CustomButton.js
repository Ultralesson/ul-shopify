import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../../constants/colors";

const CustomButton = ({ text, disabled, navigateTo }) => {
    return (
        <TouchableOpacity
            accessible={true}
            className="ml-4 mr-4"
            onPress={navigateTo}
            testID={`btn-${text.toLowerCase().split(" ").join("-")}`}
        >
            <Text
                accessible={true}
                className="text-lg font-bold text-center pt-3 pb-3 rounded-lg"
                style={{
                    backgroundColor: disabled ? SECONDARY_COLOR : PRIMARY_COLOR,
                    color: disabled ? "white" : "gray",
                }}
                testID={`txt-${text.toLowerCase().split(" ").join("-")}`}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
