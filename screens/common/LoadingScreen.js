import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";
import { Text } from "react-native";

import { randomNumber } from "../../utilities/mathHelpers";

const LoadingScreen = ({ route }) => {
    const navigation = useNavigation();
    const { navigateTo } = route.params;

    useEffect(() => {
        console.log("he");
        setTimeout(() => {
            navigation.navigate(navigateTo);
        }, randomNumber(3, 7) * 1000);
    }, []);

    return (
        <SafeAreaView className="flex flex-1 items-center justify-center">
            <Progress.Circle size={60} color="#89bff8" borderWidth={1.5} indeterminate={true} className="pb-3" />
            <Text className="font-medium">Loading...</Text>
        </SafeAreaView>
    );
};

export default LoadingScreen;
