import { Platform } from "react-native";

export const locatorTemplate = (locator) => {
    return Platform.OS === "android" ? `com.ultralesson.ulshopify:id/${locator}` : locator;
};
