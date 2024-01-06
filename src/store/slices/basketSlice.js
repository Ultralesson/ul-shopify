import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            console.log("HE;");
            console.log(action.payload);
            state.items = [...state.items, action.payload.product];
        },

        incrementQuantity: (state, action) => {
            const index = state.items.findIndex((item) => item.product_id === action.payload.id);
            if (index !== -1) {
                state.items[index].quantity += 1;
            }
        },

        decrementQuantity: (state, action) => {
            const index = state.items.findIndex((item) => item.product_id === action.payload.id);
            if (index !== -1) {
                if (state.items[index].quantity > 1) {
                    state.items[index].quantity -= 1;
                } else {
                    // Remove the item if quantity becomes 0
                    state.items.splice(index, 1);
                }
            }
        },

        deleteItem: (state, action) => {
            const index = state.items.findIndex((item) => item.product_id === action.payload.id);
            if (index !== -1) {
                state.items.splice(index, 1);
            }
        },
    },
});

export const { addToBasket, removeFromBasket, incrementQuantity, decrementQuantity, deleteItem } = basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemsWithId = (state, id) => {
    state.basket.items.filter((item) => item.id === id);
};

export const selectBasketTotal = (state) => state.basket.items.reduce((total, item) => (total += item.price), 0);

export default basketSlice.reducer;
