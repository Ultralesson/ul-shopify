import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isTabBarVisible: true,
};

export const appUIStateSlice = createSlice({
    name: "appUIState",
    initialState,
    reducers: {
        hideTabBar: (state) => {
            state.isTabBarVisible = false;
        },
        showTabBar: (state) => {
            state.isTabBarVisible = true;
        },
    },
});

export const { hideTabBar, showTabBar } = appUIStateSlice.actions;

export const selectIsTabBarVisible = (state) => state.appUIState.isTabBarVisible;

export default appUIStateSlice.reducer;
