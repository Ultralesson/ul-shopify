import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
            <View className="flex h-full justify-center items-center">
                <Text className="font-bold text-xl">Welcome to UI-Shopify</Text>
                <Text className="italic">Coming soon...</Text>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
