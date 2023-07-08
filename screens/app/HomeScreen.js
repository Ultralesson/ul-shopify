import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, Image, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HOME_SCREEN, LOADING_SCREEN } from "../../constants/screens";

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <View>
                <Text
                    onPress={() => {
                        navigation.navigate(LOADING_SCREEN, { navigateTo: HOME_SCREEN });
                        console.log("hello");
                    }}
                    className="text-red-500"
                >
                    Ul Shopify
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
