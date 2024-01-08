import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isTabBarVisible: true,
    isSplashScreenDisplayed: false,
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
        toggleSplashScreenDisplay: (state) => {
            state.isSplashScreenDisplayed = !state.isSplashScreenDisplayed;
        },
    },
});

export const { hideTabBar, showTabBar, toggleSplashScreenDisplay } = appUIStateSlice.actions;

export const selectIsTabBarVisible = (state) => state.appUIState.isTabBarVisible;
export const selectSplashScreenDisplay = (state) => state.appUIState.isSplashScreenDisplayed;

export default appUIStateSlice.reducer;
