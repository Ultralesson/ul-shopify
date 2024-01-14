import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import { QUATERNARY_COLOR, SECONDARY_COLOR } from "../../../constants/colors";

const AuthButtonSection = ({ buttonText, authQuestionText, navigateToText, navigateTo, validate, shortTitle }) => {
    const navigation = useNavigation();

    return (
        <View className="mb-5 pt-3">
            <TouchableOpacity
                testID={`btn-${buttonText.toLowerCase().split(" ").join("-")}`}
                accessibilityLabel={`btn-${buttonText.toLowerCase().split(" ").join("-")}`}
                nativeID={`btn-${buttonText.toLowerCase().split(" ").join("-")}`}
                style={{
                    backgroundColor: SECONDARY_COLOR,
                }}
                className="p-2 pt-3 pb-3 rounded-lg"
                onPress={async () => {
                    await validate();
                }}
            >
                <Text
                    testID={`txt-${buttonText.toLowerCase().split(" ").join("-")}`}
                    accessibilityLabel={`txt-${buttonText.toLowerCase().split(" ").join("-")}`}
                    nativeID={`txt-${buttonText.toLowerCase().split(" ").join("-")}`}
                    className="text-lg font-bold text-center text-white"
                >
                    {buttonText}
                </Text>
            </TouchableOpacity>

            <View className="flex-row justify-center">
                <View className="mt-2 w-10/12 border-b-[0.23px] border-solid border-gray-400"></View>
            </View>
            <View className="flex-row justify-center mt-3">
                <Text
                    testID="txt-question"
                    accessibilityLabel="txt-question"
                    nativeID="txt-question"
                    className="items-center font-bold"
                >
                    {authQuestionText}
                </Text>
                <TouchableOpacity
                    testID={`btn-${navigateToText.toLowerCase().split(" ").join("-")}`}
                    accessibilityLabel={`btn-${navigateToText.toLowerCase().split(" ").join("-")}`}
                    nativeID={`btn-${navigateToText.toLowerCase().split(" ").join("-")}`}
                    className="ml-2"
                    onPress={() => {
                        navigation.navigate(navigateTo);
                    }}
                >
                    <Text
                        testID={`txt-${navigateToText.toLowerCase().split(" ").join("-")}`}
                        accessibilityLabel={`txt-${navigateToText.toLowerCase().split(" ").join("-")}`}
                        nativeID={`txt-${navigateToText.toLowerCase().split(" ").join("-")}`}
                        className="font-bold underline"
                        style={{ color: QUATERNARY_COLOR }}
                    >
                        {navigateToText}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AuthButtonSection;
