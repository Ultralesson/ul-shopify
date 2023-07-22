import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    screenStack: [],
    actionsForLater: {},
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
                    // This condition takes care of no triggering the duplicate addition of screen while back navigation
                    if (_screenStack[_screenStack.length - 1] === screen) {
                        return;
                    }
                    _screenStack.push(screen);
                    state.screenStack = [..._screenStack];
                    return;
                case "pop":
                    // Used during back functionality
                    _screenStack.pop();
                    state.screenStack = _screenStack;
            }
        },

        executeActions: (state, action) => {
            const { actionName, actionPayload, to } = action.payload;
            switch (to) {
                case "STORE":
                    state.actionsForLater = { ...state.actionsForLater, [actionName]: actionPayload };
                    return;
                case "REMOVE":
                    const _tempActionsForLater = state.actionsForLater;
                    delete _tempActionsForLater[actionName];
                    state.actionsForLater = _tempActionsForLater;
            }
        },
    },
});

export const { screenStack, executeActions } = appStateSlice.actions;

export const selectScreenStack = (state) => state.appState.screenStack[state.appState.screenStack.length - 1];
export const selectNavigateBackScreen = (state) => state.appState.screenStack[state.appState.screenStack.length - 2];
export const selectActions = (state) => state.appState.actionsForLater;

export default appStateSlice.reducer;
