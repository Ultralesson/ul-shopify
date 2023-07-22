import AsyncStorage from "@react-native-async-storage/async-storage";

const PREFIX = "cache_";

export const userModel = async (action, data) => {
    let cachedData = null;
    switch (action) {
        case "CREATE_USER":
            if (!(await getFromLocalStorage("user").data)) {
                await setToLocalStorage("user", [data]);
            }
            cachedData = (await getFromLocalStorage("user")).data;

            return {
                message: "CREATED_USER",
                data: cachedData,
            };
        case "GET_USER":
            cachedData = (await getFromLocalStorage("user")).data;
            const user = cachedData.find((item) => item.email === data.email);
            if (user) {
                return {
                    message: "EMAIL_IS_FOUND",
                    data: user,
                };
            } else {
                return {
                    message: "EMAIL_IS_NOT_FOUND",
                    data: null,
                };
            }
    }
};

export const setToLocalStorage = async (field, data = []) => {
    try {
        await AsyncStorage.setItem(PREFIX + field, JSON.stringify(data));
        return {
            message: "CREATED_FIELD_CACHE",
            data: (await getFromLocalStorage("user")).data,
        };
    } catch (error) {
        console.log("Error in storing to cache");
        return {
            message: "INTERNAL_SERVER_ERROR",
            data: null,
        }; // false indicates that cache storage was unsuccessful
    }
};

export const getFromLocalStorage = async (field) => {
    try {
        const value = await AsyncStorage.getItem(PREFIX + field);
        return {
            message: "FOUND_FIELD_IN_CACHE",
            data: JSON.parse(value),
        };
    } catch (error) {
        console.log("Error in fetching from cache");
        return {
            message: "NOT_FOUND_FIELD_IN_CACHE",
            data: null,
        };
    }
};

export const clearLocalStorage = async () => {
    await AsyncStorage.clear();
};
