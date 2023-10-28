import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    data: {},
    loading: true
}

const checklistSlice = createSlice({
    name: 'checklists',
    initialState,
    reducers: {
        getCheckLists: (state, action) => {
            const { cardId, data } = action.payload;
            state.data[cardId] = data;
            state.loading = false;
        },
        postCheckList: (state, action) => {
            const { cardId, data } = action.payload;
            state.data[cardId].push(data);
        },
        deleteCheckList: (state, action) => {
            const { cardId, data } = action.payload;
            state.data[cardId] = state.data[cardId].filter((checklist) => checklist.id !== data);
        }
    }
})

export const checkListReducer = checklistSlice.reducer;
export const actions = checklistSlice.actions;