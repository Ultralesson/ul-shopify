import { createStackNavigator } from "@react-navigation/stack";

import TrackOrderScreen from "../../screens/app/TrackOrderScreen";
import ProfileScreen from "../../screens/app/ProfileScreen";
import LoadingScreen from "../../screens/common/LoadingScreen";
import RegistrationScreen from "../../screens/app/RegistrationScreen";
import OtpScreen from "../../screens/app/OtpScreen";

import {
    HOME_SCREEN,
    LOADING_SCREEN,
    LOGIN_SCREEN,
    OTP_SCREEN,
    PRODUCT_DISPLAY_SCREEN,
    PRODUCT_SCREEN,
    PROFILE_SCREEN,
    REGISTRATION_SCREEN,
    TRACK_ORDER_SCREEN,
} from "../../../constants/screens";
import HomeScreen from "../../screens/app/HomeScreen";
import LoginScreen from "../../screens/app/LoginScreen";
import { ProductScreen } from "../../screens/app/ProductScreen";

const Stack = createStackNavigator();

const stackOptions = (screen) => {
    switch (screen) {
        case TRACK_ORDER_SCREEN:
        case LOADING_SCREEN:
        case HOME_SCREEN:
        case PROFILE_SCREEN:
        case LOGIN_SCREEN:
        case REGISTRATION_SCREEN:
        case OTP_SCREEN:
            return {
                headerShown: false,
            };
    }
};

export const TrackOrderStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={TRACK_ORDER_SCREEN}>
            <Stack.Screen
                name={TRACK_ORDER_SCREEN}
                component={TrackOrderScreen}
                options={stackOptions(TRACK_ORDER_SCREEN)}
            />
            <Stack.Screen name={LOADING_SCREEN} component={LoadingScreen} options={stackOptions(LOADING_SCREEN)} />
            <Stack.Screen name={PROFILE_SCREEN} component={ProfileScreen} options={stackOptions(PROFILE_SCREEN)} />
            <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} options={stackOptions(LOGIN_SCREEN)} />
            <Stack.Screen
                name={REGISTRATION_SCREEN}
                component={RegistrationScreen}
                options={stackOptions(REGISTRATION_SCREEN)}
            />
            <Stack.Screen name={HOME_SCREEN} component={HomeScreen} options={stackOptions(HOME_SCREEN)} />
            <Stack.Screen name={OTP_SCREEN} component={OtpScreen} options={stackOptions(OTP_SCREEN)} />
            <Stack.Screen name={PRODUCT_SCREEN} component={ProductScreen} options={stackOptions(PRODUCT_SCREEN)} />
        </Stack.Navigator>
    );
};

export default TrackOrderStackNavigator;
