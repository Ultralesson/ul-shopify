import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomMessageModal from "../../components/common/CustomMessageModal";
import { selectRegistrationModalState } from "../../store/slices/modalsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "../../store/slices/authSlice";
import { screenStack } from "../../store/slices/appStateSlice";
import { HOME_SCREEN } from "../../../constants/screens";

const HomeScreen = () => {
    const navigation = useNavigation();
    const isAuthorized = useSelector(selectAuthState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(screenStack({ screen: HOME_SCREEN, to: "push" }));
    }, []);

    return (
        <SafeAreaView>
            {/* Keeping the modals on the very top, as they don't effect other page components */}
            {isAuthorized.type === "register" && (
                <CustomMessageModal
                    gifOrImage={require("../../../assets/gifs/success.gif")}
                    selector={selectRegistrationModalState}
                    typeOfMessage="success"
                    messages={["Registration is successful", "Welcome to Ul-Shopify"]}
                />
            )}
            <View className="flex h-full justify-center items-center">
                <Text testID="welcome-message" accessibilityLabel="welcome-message" className="font-bold text-xl">
                    Welcome to UI-Shopify
                </Text>
                <Text testID="coming-soon-message" accessibilityLabel="coming-soon-message" className="italic">
                    Coming soon...
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
