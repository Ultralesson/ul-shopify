import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../../screens/app/HomeScreen";
import LoadingScreen from "../../screens/common/LoadingScreen";

import { EXPLORE_SCREEN, HOME_SCREEN, LOADING_SCREEN } from "../../constants/screens";
import ExploreScreen from "../../screens/app/ExploreScreen";

const Stack = createStackNavigator();

const stackOptions = (screen) => {
    switch (screen) {
        case HOME_SCREEN:
        case LOADING_SCREEN:
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
            <Stack.Screen name={EXPLORE_SCREEN} component={ExploreScreen} options={stackOptions(LOADING_SCREEN)} />
        </Stack.Navigator>
    );
};

export default HomeStackNavigator;
