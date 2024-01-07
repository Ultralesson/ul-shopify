import { createStackNavigator } from "@react-navigation/stack";

import ExploreScreen from "../../screens/app/ExploreScreen";
import LoadingScreen from "../../screens/common/LoadingScreen";
import { ProductScreen } from "../../screens/app/ProductScreen";

import {
    EXPLORE_SCREEN,
    HOME_SCREEN,
    LOADING_SCREEN,
    PRODUCT_DISPLAY_SCREEN,
    PRODUCT_SCREEN,
} from "../../../constants/screens";
import HomeScreen from "../../screens/app/HomeScreen";
import { ProductDisplayScreen } from "../../screens/app/ProductDisplayScreen";

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
        case PRODUCT_DISPLAY_SCREEN:
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
        </Stack.Navigator>
    );
};

export default ExploreStackNavigator;
