import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, Image, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HOME_SCREEN, LOADING_SCREEN } from "../../constants/screens";
import CustomMessageModal from "../../components/common/CustomMessageModal";
import { selectRegistrationModalState } from "../../store/slices/modalsSlice";
import { useSelector } from "react-redux";
import { selectAuthState } from "../../store/slices/authSlice";

const HomeScreen = () => {
    const navigation = useNavigation();
    const isAuthorized = useSelector(selectAuthState);

    return (
        <SafeAreaView>
            {/* Keeping the modals on the very top, as they don't effect other page components */}
            {isAuthorized.type === "register" && (
                <CustomMessageModal
                    gifOrImage={require("../../assets/gifs/success.gif")}
                    selector={selectRegistrationModalState}
                    typeOfMessage="success"
                    messages={["Registration is successful", "Welcome to Ul-Shopify"]}
                />
            )}
            <View>
                <Text
                    onPress={() => {
                        navigation.navigate(LOADING_SCREEN, { navigateTo: HOME_SCREEN });
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
