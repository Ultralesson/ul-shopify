import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { screenStack } from "../../store/slices/appStateSlice";
import { CART_SCREEN } from "../../../constants/screens";

const CartScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(screenStack({ screen: CART_SCREEN, to: "push" }));
    }, []);

    return (
        <SafeAreaView>
            <View className="flex h-full justify-center items-center">
                <Text className="font-bold text-xl">Cart Screen</Text>
                <Text className="italic">Coming soon...</Text>
            </View>
        </SafeAreaView>
    );
};

export default CartScreen;
