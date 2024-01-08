import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideTabBar } from "../../store/slices/appUIStateSlice";
import { Image, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { PRIMARY_COLOR, QUATERNARY_COLOR, SECONDARY_COLOR, TERNARY_COLOR } from "../../../constants/colors";
import { HOME_SCREEN, HOME_TAB } from "../../../constants/screens";
import { randomNumber } from "../../../utilities/mathHelpers";

export const SplashScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hideTabBar());

        setTimeout(() => {
            navigation.navigate(HOME_TAB);
            navigation.navigate(HOME_SCREEN);
        }, randomNumber(3, 7) * 1000);
    });

    return (
        <View className="flex-1 items-center justify-center">
            <Animatable.Image
                animation={"zoomIn"}
                iterationCount={10}
                easing={"ease"}
                duration={3500}
                source={require("../../../assets/icons/ultralesson-logo.png")}
            />
            <Animatable.View
                animation={"zoomIn"}
                iterationCount={1}
                duration={2000}
                className="mt-4 flex-row items-center"
            >
                <Text className="font-bold text-sm">
                    Launching your{" "}
                    <Text className="text-lg" style={{ color: TERNARY_COLOR }}>
                        UL-Shopify...
                    </Text>
                </Text>
            </Animatable.View>
        </View>
    );
};
