import { createSlice } from "@reduxjs/toolkit";

type UserState = {
    email:string | null;
    id:string | null;
}

const initialState:UserState = {
    email: null,
    id: null,
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setUser(state,action) {
            state.email = action.payload.email;
            state.id = action.payload.id;
        },
        removeUser(state) {
            state.email = null;
            state.id = null;
        }
    }
})

export const {setUser,removeUser} = userSlice.actions;

export default userSlice.reducer;