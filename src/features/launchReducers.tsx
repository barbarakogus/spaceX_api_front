import { createSlice } from "@reduxjs/toolkit";

interface InitialStateProps {
    launchesList: Launch[];
    favoriteLaunches: LaunchInformation[];
}

const initialState: InitialStateProps = {
    launchesList: [],
    favoriteLaunches: ([] = JSON.parse(localStorage.getItem("favorites")!) || []),
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
            localStorage.setItem("favorites", JSON.stringify(state.favoriteLaunches));
        },
        removeFavoriteFromSavesList(state, action) {
            const ids = state.favoriteLaunches.map((launch) => launch.id);
            const launchToDelete = ids.indexOf(action.payload);
            state.favoriteLaunches.splice(launchToDelete, 1);
            localStorage.setItem("favorites", JSON.stringify(state.favoriteLaunches));
        },
        removeLaunchFromListByIndex(state, action) {
            state.launchesList.splice(action.payload, 1);
        },
    },
});

export const {
    setLaunchesList,
    addFavoriteLaunch,
    removeFavoriteFromSavesList,
    removeLaunchFromListByIndex,
} = productsSlice.actions;
export default productsSlice.reducer;
