import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HOME_SCREEN, HOME_TAB, LOGIN_SCREEN, PROFILE_SCREEN, REGISTRATION_SCREEN } from "../../../constants/screens";
import { SECONDARY_COLOR, TERNARY_COLOR } from "../../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "../../store/slices/authSlice";
import { hideTabBar, selectIsTabBarVisible, showTabBar } from "../../store/slices/appUIStateSlice";
import { ArrowLeftIcon } from "react-native-heroicons/outline";

const ProfileScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isAuthorized = useSelector(selectAuthState);
    const a = useSelector(selectIsTabBarVisible);

    useEffect(() => {});

    return (
        <>
            <TouchableOpacity
                className="ml-5 mt-10"
                onPress={() => {
                    dispatch(showTabBar());
                    navigation.navigate(HOME_SCREEN);
                }}
            >
                <ArrowLeftIcon size={25} color="#000000" />
            </TouchableOpacity>
            <SafeAreaView className="flex-1  bg-gray-100">
                {isAuthorized.status ? (
                    <View className="w-full px-4 justify-start">
                        <Text className="text-2xl font-bold text-center mb-4">Your Profile</Text>
                        <View className="bg-white p-6 rounded-lg shadow-md">
                            <View className=" items-center">
                                <Text className="text-lg font-semibold">Jack Sparrow</Text>
                                <Text className="text-gray-600 mt-1 mb-3">jacksparrow@gmail.com</Text>
                            </View>
                            <TouchableOpacity className="bg-red-400 p-3 rounded-lg" onPress={() => {}}>
                                <Text className="text-white text-center font-bold">Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View className="w-full px-4">
                        <Text className="text-lg font-bold text-center mb-10">
                            Welcome to{" "}
                            <Text className="text-3xl" style={{ color: TERNARY_COLOR }}>
                                UI-Shopify
                            </Text>
                        </Text>
                        <Image
                            source={require("../../../assets/images/shopping.png")}
                            resizeMode="contain"
                            className="h-1/2 w-full mb-8"
                        />
                        <TouchableOpacity
                            className="p-3 rounded-lg mb-4 text-lg font-bold"
                            style={{ backgroundColor: SECONDARY_COLOR }}
                            onPress={() => navigation.navigate(REGISTRATION_SCREEN)}
                        >
                            <Text className="text-white text-center font-bold">Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="p-3 rounded-lg font-bold"
                            style={{ backgroundColor: SECONDARY_COLOR }}
                            onPress={() => navigation.navigate(LOGIN_SCREEN)}
                        >
                            <Text className="text-white text-center font-bold">Login</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </SafeAreaView>
        </>
    );

    // return (
    //     <SafeAreaView>
    //         <View className="flex h-full justify-center items-center">
    //             <Text className="font-bold text-xl">Profile Screen</Text>
    //             <Text className="italic">Coming soon...</Text>
    //             <TouchableOpacity
    //                 onPress={() => {
    //                     navigation.navigate(REGISTRATION_SCREEN);
    //                 }}
    //             >
    //                 <Text className="p-3 font-bold rounded-lg mt-5" style={{ backgroundColor: SECONDARY_COLOR }}>
    //                     Navigate to Registration Screen
    //                 </Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity
    //                 onPress={() => {
    //                     navigation.navigate(LOGIN_SCREEN);
    //                 }}
    //             >
    //                 <Text className="p-3 font-bold rounded-lg mt-5" style={{ backgroundColor: SECONDARY_COLOR }}>
    //                     Navigate to Login Screen
    //                 </Text>
    //             </TouchableOpacity>
    //         </View>
    //     </SafeAreaView>
    // );
};

export default ProfileScreen;
