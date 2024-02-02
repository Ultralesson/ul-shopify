import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, TouchableOpacity, Platform } from "react-native";

import { QUATERNARY_COLOR, SECONDARY_COLOR } from "../../../constants/colors";
import { locatorTemplate } from "../../../utilities/locatorTemplate";

const AuthButtonSection = ({ buttonText, authQuestionText, navigateToText, navigateTo, validate, shortTitle }) => {
    const navigation = useNavigation();

    return (
        <View className="mb-5 pt-3" accessible={false}>
            <TouchableOpacity
                accessible={true}
                testID={locatorTemplate(`btn-${buttonText.toLowerCase().split(" ").join("-")}`)}
                style={{
                    backgroundColor: SECONDARY_COLOR,
                }}
                className="p-2 pt-3 pb-3 rounded-lg"
                onPress={async () => {
                    await validate();
                }}
            >
                <Text
                    accessible={true}
                    testID={locatorTemplate(`txt-${buttonText.toLowerCase().split(" ").join("-")}`)}
                    className="text-lg font-bold text-center text-white"
                >
                    {buttonText}
                </Text>
            </TouchableOpacity>

            <View className="flex-row justify-center" accessible={false}>
                <View accessible={true} className="mt-2 w-10/12 border-b-[0.23px] border-solid border-gray-400"></View>
            </View>
            <View className="flex-row justify-center mt-3" accessible={false}>
                <Text accessible={true} testID={locatorTemplate("txt-question")} className="items-center font-bold">
                    {authQuestionText}
                </Text>
                <TouchableOpacity
                    accessible={true}
                    testID={locatorTemplate(`btn-${navigateToText.toLowerCase().split(" ").join("-")}`)}
                    className="ml-2"
                    onPress={() => {
                        navigation.navigate(navigateTo);
                    }}
                >
                    <Text
                        accessible={true}
                        testID={locatorTemplate(`txt-${navigateToText.toLowerCase().split(" ").join("-")}`)}
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
