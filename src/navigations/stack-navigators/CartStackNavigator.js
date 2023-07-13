import { createStackNavigator } from "@react-navigation/stack";

import CartScreen from "../../screens/app/CartScreen";
import LoadingScreen from "../../screens/common/LoadingScreen";

import { CART_SCREEN, LOADING_SCREEN } from "../../constants/screens";

const Stack = createStackNavigator();

const stackOptions = (screen) => {
    switch (screen) {
        case CART_SCREEN:
        case LOADING_SCREEN:
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
        </Stack.Navigator>
    );
};

export default CartStackNavigator;
