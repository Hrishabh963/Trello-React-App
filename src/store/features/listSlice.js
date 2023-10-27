import { createSlice } from '@reduxjs/toolkit'

const initalState = {
    data: [],
    loading: true,
}

const listSlice = createSlice({
    name: 'lists',
    initialState: initalState,
    reducers: {
        getLists: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        postList: (state, action) => {
            state.data.push(action.payload)
        },
        deleteList: (state, action) => {
            state.data.filter((list) => list.id !== action.payload.id)
        }
    }
})

export const actions = listSlice.actions;
export const listReducer = listSlice.reducer;