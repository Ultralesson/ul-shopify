import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const existingItemIndex = state.items.findIndex(
                (item) => item.product_id === action.payload.product.product_id
            );

            if (existingItemIndex !== -1) {
                // Item exists, increment quantity
                state.items[existingItemIndex].quantity += 1;
            } else {
                // Item doesn't exist, add new item
                state.items = [...state.items, { ...action.payload.product, quantity: 1 }];
            }
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

        emptyBasket: (state) => {
            state.items = [];
        },
    },
});

export const { addToBasket, removeFromBasket, incrementQuantity, decrementQuantity, deleteItem, emptyBasket } =
    basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemsWithId = (state, id) => {
    state.basket.items.filter((item) => item.id === id);
};
export const selectBasketTotal = (state) => {
    return parseFloat(
        state.basket.items
            .reduce((total, item) => {
                return total + item.price * item.quantity;
            }, 0)
            .toFixed(2)
    );
};
export default basketSlice.reducer;
