import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const key =
    import.meta.env.VITE_API_KEY;
const token =
    import.meta.env.VITE_API_TOKEN;

const initalState = {
    data: [],
    loading: true,
    error: undefined
}

export const fetchBoards = createAsyncThunk('board/fetchBoards', () => {
    return axios.get(`https://api.trello.com/1/members/me/boards?fields=name,id,prefs&key=${key}&token=${token}`)
        .then((response) => response.data);
})

export const postBoard = createAsyncThunk('board/postBoard', (input) => {
    return axios.post(`https://api.trello.com/1/boards/?name=${input}&key=${key}&token=${token}`)
        .then((response) => response.data);
})

const boardSlice = createSlice({
    name: 'board',
    initialState: initalState,
    reducers: {
        postBoard: (state, action) => {
            state.data.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBoards.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchBoards.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchBoards.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(postBoard.fulfilled, (state, action) => {
            state.data.push(action.payload);
            state.loading = false;
        })
        builder.addCase(postBoard.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export const boardReducer = boardSlice.reducer;