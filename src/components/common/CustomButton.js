import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { HOME_SCREEN, LOADING_SCREEN } from "../../../constants/screens";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../../constants/colors";

const CustomButton = ({ text, disabled, navigateTo, loadingEnabled }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            className="ml-4 mr-4"
            onPress={() => {
                navigation.navigate(loadingEnabled ? LOADING_SCREEN : navigateTo, {
                    navigateTo: loadingEnabled ? navigateTo : null,
                });
            }}
        >
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
