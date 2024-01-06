import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import modalsSlice from "./slices/modalsSlice";
import appStateSlice from "./slices/appStateSlice";
import appUIStateSlice from "./slices/appUIStateSlice";
import basketSlice from "./slices/basketSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        modals: modalsSlice,
        appState: appStateSlice,
        appUIState: appUIStateSlice,
        basket: basketSlice,
    },
});
