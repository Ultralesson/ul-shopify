import { createStackNavigator } from "@react-navigation/stack";

import ExploreScreen from "../../screens/app/ExploreScreen";
import LoadingScreen from "../../screens/common/LoadingScreen";
import { ProductScreen } from "../../screens/app/ProductScreen";

import {
    CART_SCREEN,
    EXPLORE_SCREEN,
    HOME_SCREEN,
    LOADING_SCREEN,
    PREPARING_ORDER_SCREEN,
    PRODUCT_DISPLAY_SCREEN,
    PRODUCT_SCREEN,
    PROFILE_SCREEN,
    THANKYOU_SCREEN,
    TRACK_ORDER_SCREEN,
} from "../../../constants/screens";
import HomeScreen from "../../screens/app/HomeScreen";
import { ProductDisplayScreen } from "../../screens/app/ProductDisplayScreen";
import { CartScreen } from "../../screens/app/CartScreen";
import ProfileScreen from "../../screens/app/ProfileScreen";
import { PreparingOrderScreen } from "../../screens/app/PreparingOrderScreen";
import { ThankyouScreen } from "../../screens/app/ThankyouScreen";
import TrackOrderScreen from "../../screens/app/TrackOrderScreen";

const Stack = createStackNavigator();

const stackOptions = (screen) => {
    const COMMON = {
        headerShown: false,
    };
    switch (screen) {
        case EXPLORE_SCREEN:
            return {
                ...COMMON,
                presentation: "modal", // Not working visit later
            };
        case HOME_SCREEN:
        case LOADING_SCREEN:
        case CART_SCREEN:
        case PROFILE_SCREEN:
        case PRODUCT_DISPLAY_SCREEN:
        case PREPARING_ORDER_SCREEN:
        case THANKYOU_SCREEN:
        case TRACK_ORDER_SCREEN:
            return {
                ...COMMON,
            };
    }
};

export const ExploreStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={EXPLORE_SCREEN}>
            <Stack.Screen name={EXPLORE_SCREEN} component={ExploreScreen} options={stackOptions(LOADING_SCREEN)} />
            <Stack.Screen name={HOME_SCREEN} component={HomeScreen} options={stackOptions(HOME_SCREEN)} />
            <Stack.Screen name={LOADING_SCREEN} component={LoadingScreen} options={stackOptions(LOADING_SCREEN)} />
            <Stack.Screen name={PRODUCT_SCREEN} component={ProductScreen} options={stackOptions(LOADING_SCREEN)} />
            <Stack.Screen
                name={PRODUCT_DISPLAY_SCREEN}
                component={ProductDisplayScreen}
                options={stackOptions(PRODUCT_DISPLAY_SCREEN)}
            />
            <Stack.Screen name={CART_SCREEN} component={CartScreen} options={stackOptions(CART_SCREEN)} />
            <Stack.Screen name={PROFILE_SCREEN} component={ProfileScreen} options={stackOptions(PROFILE_SCREEN)} />
            <Stack.Screen
                name={PREPARING_ORDER_SCREEN}
                component={PreparingOrderScreen}
                options={stackOptions(PREPARING_ORDER_SCREEN)}
            />
            <Stack.Screen name={THANKYOU_SCREEN} component={ThankyouScreen} options={stackOptions(THANKYOU_SCREEN)} />

            <Stack.Screen
                name={TRACK_ORDER_SCREEN}
                component={TrackOrderScreen}
                options={stackOptions(TRACK_ORDER_SCREEN)}
            />
        </Stack.Navigator>
    );
};

export default ExploreStackNavigator;
