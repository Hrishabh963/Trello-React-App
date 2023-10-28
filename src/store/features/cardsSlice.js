import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    data: [],
    loading: true,
}

const cardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        getCards: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        postCard: (state, action) => {
            state.data.push(action.payload);
        },
        deleteCard: (state, action) => {
            state.data = state.data.filter((card) => card.id !== action.payload);
        }

    }
})

export const cardReducer = cardSlice.reducer;
export const actions = cardSlice.actions;