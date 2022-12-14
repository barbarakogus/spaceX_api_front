import { createSlice } from "@reduxjs/toolkit";

interface InitialStateProps {
    launchesList: Launch[];
}

const initialState: InitialStateProps = {
    launchesList: [],
};

const launchesSlice = createSlice({
    name: "launches",
    initialState,
    reducers: {
        setLaunchesList(state, action) {
            state.launchesList = action.payload;
        },
        removeLaunchFromListByIndex(state, action) {
            state.launchesList.splice(action.payload, 1);
        },
    },
});

export const {
    setLaunchesList,
    removeLaunchFromListByIndex,
} = launchesSlice.actions;
export default launchesSlice.reducer;
