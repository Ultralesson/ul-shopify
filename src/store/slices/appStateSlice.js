import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    screenStack: [],
};

export const appStateSlice = createSlice({
    name: "appState",
    initialState: initialState,
    reducers: {
        screenStack: (state, action) => {
            const { screen, to } = action.payload;
            const _screenStack = state.screenStack;
            switch (to) {
                case "push":
                    console.log(screen);
                    _screenStack.push(screen);
                    state.screenStack = [..._screenStack];
                    return;
            }
        },
    },
});

export const { screenStack } = appStateSlice.actions;

export const selectScreenStack = (state) => state.appState.screenStack[state.appState.screenStack.length - 1];

export default appStateSlice.reducer;
