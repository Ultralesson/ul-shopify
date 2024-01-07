import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [
        {
            fullName: "John Doe",
            email: "john.doe@example.com",
            mobileNumber: "1234567890",
            password: "password123",
            confirmPassword: "password123",
            cart: [
                {
                    product_id: "101",
                    name: "Sample Product",
                    price: 29.99,
                    quantity: 1,
                },
            ],
        },
    ],
    currentUser: null,
    message: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        createUser: (state, action) => {
            // Add a new user if they don't already exist
            const userExists = state.users.some((user) => user.email === action.payload.email);
            if (!userExists) {
                state.users.push(action.payload);
                state.message = "CREATED_USER";
            } else {
                state.message = "USER_ALREADY_EXISTS";
            }
        },
        getUser: (state, action) => {
            // Find and set the current user
            const user = state.users.find((user) => user.email === action.payload.email);
            if (user) {
                state.currentUser = user;
                state.message = "EMAIL_IS_FOUND";
            } else {
                state.message = "EMAIL_IS_NOT_FOUND";
            }
        },
        addOrderDetails: (state, action) => {
            // Add order details to the user's cart
            const userIndex = state.users.findIndex((user) => user.email === action.payload.email);
            if (userIndex !== -1) {
                const user = state.users[userIndex];
                user.cart = user.cart || [];
                action.payload.cartItems.forEach((cartItem) => {
                    user.cart.push({ ...cartItem, date: new Date(), status: "placed" });
                });
                state.message = "ORDER_DETAILS_ADDED";
            } else {
                state.message = "USER_NOT_FOUND";
            }
        },
    },
});

export const { createUser, getUser, addOrderDetails } = userSlice.actions;

export const selectUsers = (state) => state.user.users;
export const selectCurrentUser = (state) => {
    return state.user.currentUser;
};
export const selectUserMessage = (state) => state.user.message;

export default userSlice.reducer;
