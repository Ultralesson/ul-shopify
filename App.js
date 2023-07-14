import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import { KeyboardAvoidingView, Platform } from "react-native";

import { store } from "./src/store/store";

import HomeTabNavigator from "./src/navigations/tab-navigators/HomeTabNavigator";

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                {/* There is small issue in both Android and iOS that small portion of input fields is over-layed with keyboard on display - visit later to resolve this */}
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null}>
                    <HomeTabNavigator />
                </KeyboardAvoidingView>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
