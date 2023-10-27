import { configureStore } from '@reduxjs/toolkit'
import { boardReducer } from './features/boardSlice'
import { listReducer } from './features/listSlice'
export const store = configureStore({
    reducer: {
        board: boardReducer,
        lists: listReducer
    }
})