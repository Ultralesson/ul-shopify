import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    actionsForLater: {},
};

export const appStateSlice = createSlice({
    name: "appState",
    initialState: initialState,
    reducers: {
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

export const selectActions = (state) => state.appState.actionsForLater;

export default appStateSlice.reducer;
