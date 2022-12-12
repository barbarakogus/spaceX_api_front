import { createSlice } from "@reduxjs/toolkit";

interface InitialStateProps {
    launchesList: Launch[];
    favoriteLaunches: Launch[];
}

const initialState: InitialStateProps = {
    launchesList: [],
    favoriteLaunches: [],
};

const productsSlice = createSlice({
    name: "launches",
    initialState,
    reducers: {
        setLaunchesList(state, action) {
            state.launchesList = action.payload;
        },
        addFavoriteLaunch(state, action) {
            const ids = state.favoriteLaunches.map((launch) => launch.id);
            if (ids.indexOf(action.payload.id) != -1) {
                return;
            }
            state.favoriteLaunches.push(action.payload);
        },
        removeLaunchFromListByIndex(state, action) {
            state.launchesList.splice(action.payload, 1)
        },
    },
});

export const { setLaunchesList, addFavoriteLaunch, removeLaunchFromListByIndex } = productsSlice.actions;
export default productsSlice.reducer;
