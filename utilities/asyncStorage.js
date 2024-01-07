import AsyncStorage from "@react-native-async-storage/async-storage";

const PREFIX = "cache_";

export const userModel = async (action, data) => {
    let cachedData = null;
    switch (action) {
        case "CREATE_USER":
            // Get existing users from local storage
            let existingUsers = (await getFromLocalStorage("user")).data || [];

            // Check if the new user already exists to avoid duplicates
            const userExists = existingUsers.some((user) => user.email === data.email); // Assuming each user has a unique 'id'

            // Add the new user if they don't already exist
            if (!userExists) {
                existingUsers.push(data);
                await setToLocalStorage("user", existingUsers);
            } else {
                // Handle the case where the user already exists (optional)
            }

            // Get the updated list of users
            cachedData = (await getFromLocalStorage("user")).data;

            return {
                message: "CREATED_USER",
                data: cachedData,
            };
        case "GET_USER":
            cachedData = (await getFromLocalStorage("user")).data || [];
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
        case "ADD_ORDER_DETAILS":
            let users = (await getFromLocalStorage("user")).data;
            let userIndex = users.findIndex((user) => user.email === data.email);
            if (userIndex !== -1) {
                users[userIndex].cart = users[userIndex].cart || [];
                data.cartItems.forEach((cartItem) => {
                    users[userIndex].cart.push({ ...cartItem, date: new Date(), status: "placed" });
                });
                await setToLocalStorage("user", users);
            }
            return {
                message: userIndex !== -1 ? "ORDER_DETAILS_ADDED" : "USER_NOT_FOUND",
                data: userIndex !== -1 ? users[userIndex] : null,
            };
    }
};

export const setToLocalStorage = async (field, data = []) => {
    try {
        await AsyncStorage.setItem(PREFIX + field, JSON.stringify(data));
        const _data = (await getFromLocalStorage("user")).data;
        return {
            message: "CREATED_FIELD_CACHE",
            data: _data,
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
