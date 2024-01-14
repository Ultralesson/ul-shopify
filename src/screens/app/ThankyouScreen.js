import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import { SECONDARY_COLOR } from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { HOME_SCREEN, TRACK_ORDER_SCREEN } from "../../../constants/screens";
import { useDispatch } from "react-redux";
import { showTabBar } from "../../store/slices/appUIStateSlice";

export const ThankyouScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    return (
        <SafeAreaView className="flex-1 justify-center items-center">
            <Animatable.Image
                source={require("../../../assets/images/success.jpg")}
                animation="slideInUp"
                iterationCount={1}
                className="h-10 w-10"
            />
            <Text
                testID="txt-thanks-shopping"
                accessibilityLabel="txt-thanks-shopping"
                nativeID="txt-thanks-shopping"
                className="text-lg my-2 text-center mb-6"
            >
                Thanks for Shopping in UL-Shopify
            </Text>
            <Text testID="txt-confirmed-order" accessibilityLabel="txt-confirmed-order" nativeID="txt-confirmed-order">
                Your order has been confirmed
            </Text>
            <View className="flex-row space-x-4 mt-3">
                <TouchableOpacity
                    testID="btn-order-details"
                    accessibilityLabel="btn-order-details"
                    nativeID="btn-order-details"
                    className="px-6 mt-2 py-4 rounded-xl"
                    style={{ backgroundColor: SECONDARY_COLOR }}
                    onPress={() => {
                        navigation.navigate(TRACK_ORDER_SCREEN);
                    }}
                >
                    <Text
                        testID="txt-order-details"
                        accessibilityLabel="txt-order-details"
                        nativeID="txt-order-details"
                        className="text-white font-bold"
                    >
                        Order Details
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    testID="btn-continue-shopping"
                    accessibilityLabel="btn-continue-shopping"
                    nativeID="btn-continue-shopping"
                    className="px-6 mt-2 py-4 rounded-xl "
                    style={{ backgroundColor: SECONDARY_COLOR }}
                    onPress={() => {
                        dispatch(showTabBar());
                        navigation.navigate(HOME_SCREEN);
                    }}
                >
                    <Text
                        testID="txt-continue-shopping"
                        accessibilityLabel="txt-continue-shopping"
                        nativeID="txt-continue-shopping"
                        className="text-white font-bold"
                    >
                        Continue Shopping
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
