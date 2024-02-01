import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HOME_SCREEN, LOGIN_SCREEN, REGISTRATION_SCREEN } from "../../../constants/screens";
import { SECONDARY_COLOR, TERNARY_COLOR } from "../../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuthState } from "../../store/slices/authSlice";
import { showTabBar } from "../../store/slices/appUIStateSlice";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { userModel } from "../../../utilities/asyncStorage";

const ProfileScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isAuthorized = useSelector(selectAuthState);
    const [username, setUsername] = useState("");

    useEffect(() => {
        userModel("GET_USER", { email: isAuthorized.email }).then((response) => {
            setUsername(response.data?.fullName);
        });
    });

    return (
        <>
            <TouchableOpacity
                accessible={true}
                testID="btn-back"
                className="ml-5 mt-10"
                onPress={() => {
                    dispatch(showTabBar());
                    navigation.navigate(HOME_SCREEN);
                }}
            >
                <ArrowLeftIcon size={25} color="#000000" />
            </TouchableOpacity>
            <SafeAreaView className="flex-1  bg-white-100" accessible={false}>
                {isAuthorized.status ? (
                    <View className="w-full px-4 justify-start" accessible={false}>
                        <Text
                            accessible={true}
                            testID="txt-your-profile-heading"
                            className="text-2xl font-bold text-center mb-4"
                        >
                            Your Profile
                        </Text>
                        <View className="bg-white p-6 rounded-lg shadow-md" accessible={false}>
                            <View className=" items-center" accessible={false}>
                                <Text accessible={true} testID="txt-username" className="text-lg font-semibold">
                                    {username}
                                </Text>
                                <Text testID="txt-email" accessible={true} className="text-gray-600 mt-1 mb-3">
                                    {isAuthorized.email}
                                </Text>
                            </View>
                            <TouchableOpacity
                                accessible={true}
                                testID="btn-logout"
                                className="bg-red-400 p-3 rounded-lg"
                                onPress={() => {
                                    dispatch(logout());
                                }}
                            >
                                <Text
                                    accessible={true}
                                    testID="txt-logout"
                                    className="text-white text-center font-bold"
                                >
                                    Logout
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View className="w-full px-4" accessible={false}>
                        <Text
                            accessible={true}
                            testID="txt-welcome-to-ulshopify"
                            className="text-lg font-bold text-center mb-10"
                        >
                            Welcome to{" "}
                            <Text accessible={true} className="text-3xl" style={{ color: TERNARY_COLOR }}>
                                UI-Shopify
                            </Text>
                        </Text>
                        <Image
                            testID="img-welcome-to-ulshopify"
                            accessible={true}
                            source={require("../../../assets/images/shopping.png")}
                            resizeMode="contain"
                            className="h-1/2 w-full mb-8"
                        />
                        <TouchableOpacity
                            testID="btn-register"
                            accessible={true}
                            className="p-3 rounded-lg mb-4 text-lg font-bold"
                            style={{ backgroundColor: SECONDARY_COLOR }}
                            onPress={() => navigation.navigate(REGISTRATION_SCREEN)}
                        >
                            <Text accessible={true} testID="txt-register" className="text-white text-center font-bold">
                                Register
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            testID="btn-login"
                            accessible={true}
                            className="p-3 rounded-lg font-bold"
                            style={{ backgroundColor: SECONDARY_COLOR }}
                            onPress={() => navigation.navigate(LOGIN_SCREEN)}
                        >
                            <Text testID="txt-login" accessible={true} className="text-white text-center font-bold">
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </SafeAreaView>
        </>
    );
};

export default ProfileScreen;
