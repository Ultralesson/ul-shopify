import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LOGIN_SCREEN, PROFILE_SCREEN, REGISTRATION_SCREEN } from "../../../constants/screens";
import { SECONDARY_COLOR } from "../../../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

const ProfileScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    return (
        <SafeAreaView>
            <View className="flex h-full justify-center items-center">
                <Text className="font-bold text-xl">Profile Screen</Text>
                <Text className="italic">Coming soon...</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(REGISTRATION_SCREEN);
                    }}
                >
                    <Text className="p-3 font-bold rounded-lg mt-5" style={{ backgroundColor: SECONDARY_COLOR }}>
                        Navigate to Registration Screen
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(LOGIN_SCREEN);
                    }}
                >
                    <Text className="p-3 font-bold rounded-lg mt-5" style={{ backgroundColor: SECONDARY_COLOR }}>
                        Navigate to Login Screen
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;
