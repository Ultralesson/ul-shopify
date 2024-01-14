import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";
import { Text } from "react-native";

import { randomNumber } from "../../../utilities/mathHelpers";

const LoadingScreen = ({ route }) => {
    const navigation = useNavigation();
    const { navigateTo, ...otherParams } = route.params;

    // useEffect will be executed once the DOM is painted
    useEffect(() => {
        // Loading functionality will be triggered only if the navigateTo is given
        if (navigateTo) {
            // Internal to setTimeout will be executed after specified timeout
            setTimeout(() => {
                navigation.navigate(navigateTo, {
                    ...otherParams, // Apart from the navigateTo param if we have other params then we pass onto navigateTo screen
                });
            }, randomNumber(3, 7) * 1000);
        }
    }, [navigateTo]);

    return (
        <SafeAreaView className="flex flex-1 items-center justify-center">
            <Progress.Circle
                testID="img-progress"
                accessibilityLabel="img-progress"
                nativeID="img-progress"
                size={60}
                color="#89bff8"
                borderWidth={1.5}
                indeterminate={true}
                className="pb-3"
            />
            <Text testID="txt-loading" accessibilityLabel="txt-loading" nativeID="txt-loading" className="font-medium">
                Loading...
            </Text>
        </SafeAreaView>
    );
};

export default LoadingScreen;
