import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider } from "react-redux";
import { KeyboardAvoidingView, Platform } from "react-native";

import { store } from "./store/store";

import HomeScreen from "./screens/app/HomeScreen";
import LoadingScreen from "./screens/common/LoadingScreen";
import RegistrationScreen from "./screens/app/RegistrationScreen";

import { HOME_SCREEN, LOADING_SCREEN, LOGIN_SCREEN, REGISTRATION_SCREEN } from "./constants/screens";
import LoginScreen from "./screens/app/LoginScreen";

const Stack = createStackNavigator();

const stackOptions = (screen) => {
    switch (screen) {
        case HOME_SCREEN:
        case REGISTRATION_SCREEN:
        case LOGIN_SCREEN:
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
                {/* There is small issue in both Android and iOS that small portion of input fields is over-layed with keyboard on display - visit later to resolve this */}
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null}>
                    <Stack.Navigator initialRouteName={HOME_SCREEN}>
                        <Stack.Screen name={HOME_SCREEN} component={HomeScreen} options={stackOptions(HOME_SCREEN)} />
                        <Stack.Screen
                            name={REGISTRATION_SCREEN}
                            component={RegistrationScreen}
                            options={stackOptions(REGISTRATION_SCREEN)}
                        />
                        <Stack.Screen
                            name={LOGIN_SCREEN}
                            component={LoginScreen}
                            options={stackOptions(REGISTRATION_SCREEN)}
                        />
                        <Stack.Screen
                            name={LOADING_SCREEN}
                            component={LoadingScreen}
                            options={stackOptions(LOADING_SCREEN)}
                        />
                    </Stack.Navigator>
                </KeyboardAvoidingView>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
