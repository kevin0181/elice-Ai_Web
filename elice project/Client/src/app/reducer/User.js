import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { value: false },
    reducers: {
        login: (state, action) => {
            state.value = true;
        },
        logout: state => {
            state.value = false;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;