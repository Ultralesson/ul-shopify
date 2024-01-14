import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import { KeyboardAvoidingView, Platform, LogBox } from "react-native";
import Toast from "./src/modals/Toast";

import { store } from "./src/store/store";

import HomeTabNavigator from "./src/navigations/tab-navigators/HomeTabNavigator";
import Modals from "./src/modals/Modals";
import { useEffect } from "react";
import { dummyAccountCreation } from "./utilities/asyncStorage";

const App = () => {
    useEffect(() => {
        LogBox.ignoreAllLogs(true);
        async function create() {
            await dummyAccountCreation();
        }
        // Ensuring to have a dummy account for automation purposes for login state
        create();
    }, []);

    return (
        <Provider store={store}>
            <NavigationContainer>
                {/* There is small issue in both Android and iOS that small portion of input fields is over-layed with keyboard on display - visit later to resolve this */}
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null}>
                    {/* Modals are not part of any DOM structure, they are independent entities */}
                    <Modals />
                    <Toast />
                    <HomeTabNavigator />
                </KeyboardAvoidingView>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
