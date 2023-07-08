import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";

import { store } from "./store/store";

import HomeScreen from "./screens/app/HomeScreen";
import LoadingScreen from "./screens/common/LoadingScreen";

import { HOME_SCREEN, LOADING_SCREEN } from "./constants/screens";

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

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name={HOME_SCREEN} component={HomeScreen} options={stackOptions(HOME_SCREEN)} />
                    <Stack.Screen
                        name={LOADING_SCREEN}
                        component={LoadingScreen}
                        options={stackOptions(LOADING_SCREEN)}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
