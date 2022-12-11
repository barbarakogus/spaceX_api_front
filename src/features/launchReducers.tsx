import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    launchesList: [] as any[],
    favoriteLaunches: [] as any[],
};

const productsSlice = createSlice({
    name: "launches",
    initialState,
    reducers: {
        setLaunchesList(state, action) {
            state.launchesList = action.payload;
        },
        setFavoriteLaunches(state, action) {
            state.favoriteLaunches.push(action.payload)
        }
    },
});

export const { setLaunchesList, setFavoriteLaunches } = productsSlice.actions;
export default productsSlice.reducer;
