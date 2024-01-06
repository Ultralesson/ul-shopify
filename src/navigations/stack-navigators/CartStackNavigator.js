import { createStackNavigator } from "@react-navigation/stack";

import { CartScreen } from "../../screens/app/CartScreen";
import LoadingScreen from "../../screens/common/LoadingScreen";
import HomeScreen from "../../screens/app/HomeScreen";

import { CART_SCREEN, HOME_SCREEN, LOADING_SCREEN, PRODUCT_SCREEN } from "../../../constants/screens";
import { ProductScreen } from "../../screens/app/ProductScreen";

const Stack = createStackNavigator();

const stackOptions = (screen) => {
    switch (screen) {
        case CART_SCREEN:
        case LOADING_SCREEN:
        case HOME_SCREEN:
        case PRODUCT_SCREEN:
            return {
                headerShown: false,
            };
    }
};

export const CartStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={CART_SCREEN}>
            <Stack.Screen name={CART_SCREEN} component={CartScreen} options={stackOptions(CART_SCREEN)} />
            <Stack.Screen name={LOADING_SCREEN} component={LoadingScreen} options={stackOptions(LOADING_SCREEN)} />
            <Stack.Screen name={HOME_SCREEN} component={HomeScreen} options={stackOptions(HOME_SCREEN)} />
            <Stack.Screen name={PRODUCT_SCREEN} component={ProductScreen} options={stackOptions(PRODUCT_SCREEN)} />
        </Stack.Navigator>
    );
};

export default CartStackNavigator;
