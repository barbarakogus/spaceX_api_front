import { createSlice } from "@reduxjs/toolkit";

interface InitialStateProps {
    launchesList: Launch[],
    favoriteLaunches: Launch[]
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
            state.favoriteLaunches.push(action.payload)
        }
    },
});

export const { setLaunchesList, addFavoriteLaunch } = productsSlice.actions;
export default productsSlice.reducer;
