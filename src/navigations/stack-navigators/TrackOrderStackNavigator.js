import { createStackNavigator } from "@react-navigation/stack";

import TrackOrderScreen from "../../screens/app/TrackOrderScreen";
import LoadingScreen from "../../screens/common/LoadingScreen";

import { LOADING_SCREEN, TRACK_ORDER_SCREEN } from "../../../constants/screens";

const Stack = createStackNavigator();

const stackOptions = (screen) => {
    switch (screen) {
        case TRACK_ORDER_SCREEN:
        case LOADING_SCREEN:
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
        </Stack.Navigator>
    );
};

export default TrackOrderStackNavigator;
