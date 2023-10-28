import { createSlice } from "@reduxjs/toolkit";
import { changeState } from "../../modules/Checklist/Utils/checkItemsHelper";

const initialState = {
    data: {},
    loading: true
}

const checkItemsSlice = createSlice({
    name: 'checkItems',
    initialState,
    reducers: {
        getCheckItems: (state, action) => {
            const { checkListId, data } = action.payload;
            state.data[checkListId] = data;
        },
        postCheckItem: (state, action) => {
            const { checkListId, data } = action.payload;
            state.data[checkListId].push(data);
        },
        deleteCheckItem: (state, action) => {
            const { checkListId, data } = action.payload;
            state.data[checkListId] = state.data[checkListId].filter((checkItem) => checkItem.id !== data);
        },
        updateCheckItemState: (state, action) => {
            const { checkListId, checked, id } = action.payload;
            state.data[checkListId] = changeState(checked, id, state.data[checkListId]);
        }
    }
})