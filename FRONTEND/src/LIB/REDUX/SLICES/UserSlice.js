import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
};

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
    },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
