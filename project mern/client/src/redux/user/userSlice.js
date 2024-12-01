import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    currentUser : null,
    loading : false,
    error : false,
};

const userSlice = createSlice({

    name : 'user',
    initialState,
    reducers : {
        signInstart : (state) => {
            state.loading = true;
        },
        signInSuccess : (state , action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure : (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart : (state) => {
            state.loading = true;
        },
        updateUserSuccess : (state , action) => {
            state.currentUser = action.payload;
            state.loading = true;
            state.error = false;

        },
        updateUserFaliure : (state , action) =>{
            state.loading = false;
            state.error = action.payload;

        },
        deleteUserStart : (state) => {
            state.loading = true;
        },
        deleteUserSuccess : (state) => {
            state.currentUser = null;
            state.loading = true;
            state.error = false;

        },
        deleteUserFaliure : (state , action) =>{
            state.loading = false;
            state.error = action.payload;

        }

    }
});

export const { signInstart, signInSuccess, signInFailure,updateUserFaliure,updateUserSuccess,updateUserStart,deleteUserFaliure,deleteUserSuccess,deleteUserStart} = userSlice.actions;

export default userSlice.reducer;