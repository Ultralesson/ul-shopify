import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../../screens/app/HomeScreen";
import LoadingScreen from "../../screens/common/LoadingScreen";

import { CART_SCREEN, EXPLORE_SCREEN, HOME_SCREEN, LOADING_SCREEN, PRODUCT_SCREEN } from "../../../constants/screens";
import ExploreScreen from "../../screens/app/ExploreScreen";
import { ProductScreen } from "../../screens/app/ProductScreen";
import { CartScreen } from "../../screens/app/CartScreen";

const Stack = createStackNavigator();

const stackOptions = (screen) => {
    switch (screen) {
        case HOME_SCREEN:
        case LOADING_SCREEN:
        case EXPLORE_SCREEN:
        case PRODUCT_SCREEN:
        case CART_SCREEN:
            return {
                headerShown: false,
            };
    }
};

export const HomeStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={HOME_SCREEN}>
            <Stack.Screen name={HOME_SCREEN} component={HomeScreen} options={stackOptions(HOME_SCREEN)} />
            <Stack.Screen name={LOADING_SCREEN} component={LoadingScreen} options={stackOptions(LOADING_SCREEN)} />
            <Stack.Screen name={EXPLORE_SCREEN} component={ExploreScreen} options={stackOptions(EXPLORE_SCREEN)} />
            <Stack.Screen name={PRODUCT_SCREEN} component={ProductScreen} options={stackOptions(PRODUCT_SCREEN)} />
            <Stack.Screen name={CART_SCREEN} component={CartScreen} options={stackOptions(CART_SCREEN)} />
        </Stack.Navigator>
    );
};

export default HomeStackNavigator;
