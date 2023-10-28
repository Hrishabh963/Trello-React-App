import { createSlice } from '@reduxjs/toolkit'

const initalState = {
    data: [],
    loading: true,
    bgColor: undefined,
    bgImg: undefined
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
            state.data = state.data.filter((list) => list.id !== action.payload)
        },
        setBackground: (state, action) => {
            state.bgColor = action.payload.backgroundColor;
            state.bgImg = action.payload.backgroundImage;
        }

    }
})

export const actions = listSlice.actions;
export const listReducer = listSlice.reducer;