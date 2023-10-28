import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    data: {},
    loading: true,
}

const cardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        getCards: (state, action) => {
            state.data[action.payload.listId] = action.payload.cardsData;
            state.loading = false;
        },
        postCard: (state, action) => {
            state.data[action.payload.listId].push(action.payload.cardData);
        },
        deleteCard: (state, action) => {
            state.data[action.payload.listId] = state.data[action.payload.listId].filter((card) => card.id !== action.payload.cardId);
        }

    }
})

export const cardReducer = cardSlice.reducer;
export const actions = cardSlice.actions;