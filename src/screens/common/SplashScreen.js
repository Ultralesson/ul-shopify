import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideTabBar, selectSplashScreenDisplay, toggleSplashScreenDisplay } from "../../store/slices/appUIStateSlice";
import { Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { TERNARY_COLOR } from "../../../constants/colors";
import { HOME_SCREEN, HOME_TAB } from "../../../constants/screens";
import { randomNumber } from "../../../utilities/mathHelpers";

export const SplashScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isSplashScreenDisplayed = useSelector(selectSplashScreenDisplay); // Using this property to just show the splash screen only once

    useEffect(() => {
        dispatch(hideTabBar());
        if (isSplashScreenDisplayed) {
            navigation.navigate(HOME_TAB);
            navigation.navigate(HOME_SCREEN);
            return;
        }

        setTimeout(() => {
            dispatch(toggleSplashScreenDisplay());
            navigation.navigate(HOME_TAB);
            navigation.navigate(HOME_SCREEN);
        }, randomNumber(3, 7) * 1000);
    }, []);

    return (
        <View className="flex-1 items-center justify-center" accessible={false}>
            <Animatable.Image
                accessible={true}
                testID="icon-ul"
                animation={"zoomIn"}
                iterationCount={10}
                easing={"ease"}
                duration={3500}
                source={require("../../../assets/icons/ultralesson-logo.png")}
            />
            <View accessible={false} className="mt-4 flex-row items-center">
                <Text accessible={true} className="font-bold text-sm" testID="txt-launching-ul-shopify">
                    Launching your{" "}
                    <Text className="text-lg" style={{ color: TERNARY_COLOR }}>
                        UL-Shopify...
                    </Text>
                </Text>
            </View>
        </View>
    );
};
