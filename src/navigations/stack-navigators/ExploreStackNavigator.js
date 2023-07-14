import { createStackNavigator } from "@react-navigation/stack";

import ExploreScreen from "../../screens/app/ExploreScreen";
import LoadingScreen from "../../screens/common/LoadingScreen";

import { EXPLORE_SCREEN, HOME_SCREEN, LOADING_SCREEN } from "../../../constants/screens";
import HomeScreen from "../../screens/app/HomeScreen";

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
        </Stack.Navigator>
    );
};

export default ExploreStackNavigator;
