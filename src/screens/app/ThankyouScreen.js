import React from "react";
import { Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { SECONDARY_COLOR, TERNARY_COLOR } from "../../../constants/colors";
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
            <Text className="text-lg my-2 text-center mb-6">Thanks for Shopping in UL-Shopify</Text>
            <Text>Your order has been confirmed</Text>
            <View className="flex-row space-x-4 mt-3">
                <TouchableOpacity
                    className="px-6 mt-2 py-4 rounded-xl "
                    style={{ backgroundColor: SECONDARY_COLOR }}
                    onPress={() => {
                        navigation.navigate(TRACK_ORDER_SCREEN);
                    }}
                >
                    <Text className="text-white font-bold">Order Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="px-6 mt-2 py-4 rounded-xl "
                    style={{ backgroundColor: SECONDARY_COLOR }}
                    onPress={() => {
                        dispatch(showTabBar());
                        navigation.navigate(HOME_SCREEN);
                    }}
                >
                    <Text className="text-white font-bold">Continue Shopping</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
