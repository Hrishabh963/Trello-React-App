import { createSlice } from '@reduxjs/toolkit'
const initalState = {
    data: [],
    loading: true
}
const boardSlice = createSlice({
    name: 'board',
    initialState: initalState,
    reducers: {
        getBoards: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        postBoard: (state, action) => {
            state.data.push(action.payload)
        }
    }
})

export const actions = boardSlice.actions;
export const boardReducer = boardSlice.reducer;