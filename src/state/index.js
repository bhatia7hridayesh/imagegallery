import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    data: [],
    searchSuggestions: [],
};


export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setData: (state, action) => {
            state.data = action.payload.data;
        },
        setSearchSuggestions: (state, action) => {
            state.searchSuggestions.push(action.payload.searchSuggestions);
        }
    }
});

export const {setMode, setData, setSearchSuggestions} = appSlice.actions;
export default appSlice.reducer;