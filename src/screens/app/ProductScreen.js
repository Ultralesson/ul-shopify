import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const ProductScreen = () => {
    const {
        params: { product },
    } = useRoute();
    return (
        <SafeAreaView className="bg-white pt-5">
            <View>
                <Text>{product.name}</Text>
            </View>
        </SafeAreaView>
    );
};
