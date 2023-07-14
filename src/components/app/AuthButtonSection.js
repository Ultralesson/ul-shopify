import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import { QUATERNARY_COLOR, SECONDARY_COLOR } from "../../../constants/colors";
import GoogleAuthSection from "./GoogleAuthSection";
import { HOME_SCREEN } from "../../../constants/screens";

const AuthButtonSection = ({ buttonText, authQuestionText, navigateToText, navigateTo, validate, shortTitle }) => {
    const navigation = useNavigation();

    return (
        <View className="mb-5 pt-3">
            <TouchableOpacity
                style={{
                    backgroundColor: SECONDARY_COLOR,
                }}
                className="p-2 pt-3 pb-3 rounded-lg"
                onPress={() => {
                    validate();
                }}
            >
                <Text className="text-lg font-bold text-center">{buttonText}</Text>
            </TouchableOpacity>

            <GoogleAuthSection />

            <View className="flex-row justify-center">
                <View className="mt-2 w-10/12 border-b-[0.23px] border-solid border-gray-400"></View>
            </View>
            <View className="flex-row justify-center mt-3">
                <Text className="items-center font-bold">{authQuestionText}</Text>
                <TouchableOpacity
                    className="ml-2"
                    onPress={() => {
                        navigation.navigate(navigateTo);
                    }}
                >
                    <Text className="font-bold underline" style={{ color: QUATERNARY_COLOR }}>
                        {navigateToText}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AuthButtonSection;
