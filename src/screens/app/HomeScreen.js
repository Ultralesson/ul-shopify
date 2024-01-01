import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomMessageModal from "../../components/common/CustomMessageModal";
import { changeRegistrationModalState, selectRegistrationModalState } from "../../store/slices/modalsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "../../store/slices/authSlice";
import { screenStack } from "../../store/slices/appStateSlice";
import { EXPLORE_SCREEN, HOME_SCREEN } from "../../../constants/screens";
import {
    AdjustmentsVerticalIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
    UserIcon,
} from "react-native-heroicons/outline";
import { TERNARY_COLOR } from "../../../constants/colors";
import { hideTabBar } from "../../store/slices/appUIStateSlice";

const HomeScreen = () => {
    const navigation = useNavigation();
    const isAuthorized = useSelector(selectAuthState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(screenStack({ screen: HOME_SCREEN, to: "push" }));
    }, []);

    return (
        <SafeAreaView className="bg-white pt-5">
            {/* Keeping the modals on the very top, as they don't effect other page components */}
            {isAuthorized.type === "register" && (
                <CustomMessageModal
                    gifOrImage={require("../../../assets/gifs/success.gif")}
                    selector={selectRegistrationModalState}
                    resetState={changeRegistrationModalState}
                    typeOfMessage="success"
                    messages={["Registration is successful", "Welcome to Ul-Shopify"]}
                />
            )}
            <View className="flex-row pb-3 items-center mx-4 space-x-2">
                <Image
                    source={{
                        uri: "https://links.papareact.com/wru",
                    }}
                    className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                />
                <View className="flex-1">
                    <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
                    <Text className="font-bold text-xl">
                        Current Location <ChevronDownIcon size={20} color={TERNARY_COLOR} />
                    </Text>
                </View>
                <UserIcon size={35} color={TERNARY_COLOR} />
            </View>
            <View className="flex-row items-center space-x-2 pb-2 mx-2">
                <View className="flex-row flex-1 space-x-2 bg-gray-200 p-2 rounded-md">
                    <MagnifyingGlassIcon color={TERNARY_COLOR} />
                    <TouchableOpacity
                        onPress={() => {
                            dispatch(hideTabBar());
                            navigation.navigate(EXPLORE_SCREEN);
                        }}
                    >
                        <Text>Restaurant and cuisines</Text>
                    </TouchableOpacity>
                </View>
                <AdjustmentsVerticalIcon color={TERNARY_COLOR} />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
