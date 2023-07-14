import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../../screens/app/LoginScreen";
import ProfileScreen from "../../screens/app/ProfileScreen";
import HomeScreen from "../../screens/app/HomeScreen";
import RegistrationScreen from "../../screens/app/RegistrationScreen";
import LoadingScreen from "../../screens/common/LoadingScreen";

import {
    HOME_SCREEN,
    LOADING_SCREEN,
    LOGIN_SCREEN,
    OTP_SCREEN,
    PROFILE_SCREEN,
    REGISTRATION_SCREEN,
} from "../../../constants/screens";
import OtpScreen from "../../screens/app/OtpScreen";

const Stack = createStackNavigator();

const stackOptions = (screen) => {
    switch (screen) {
        case HOME_SCREEN:
        case REGISTRATION_SCREEN:
        case LOGIN_SCREEN:
        case LOADING_SCREEN:
        case OTP_SCREEN:
            return {
                headerShown: false,
            };
    }
};

export const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={PROFILE_SCREEN}>
            <Stack.Screen name={PROFILE_SCREEN} component={ProfileScreen} options={stackOptions(REGISTRATION_SCREEN)} />
            <Stack.Screen
                name={REGISTRATION_SCREEN}
                component={RegistrationScreen}
                options={stackOptions(REGISTRATION_SCREEN)}
            />
            <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} options={stackOptions(LOGIN_SCREEN)} />
            <Stack.Screen name={LOADING_SCREEN} component={LoadingScreen} options={stackOptions(LOADING_SCREEN)} />
            <Stack.Screen name={OTP_SCREEN} component={OtpScreen} options={stackOptions(OTP_SCREEN)} />
            <Stack.Screen name={HOME_SCREEN} component={HomeScreen} options={stackOptions(HOME_SCREEN)} />
        </Stack.Navigator>
    );
};

export default ProfileStackNavigator;
