import { configureStore } from '@reduxjs/toolkit'
import { boardReducer } from './features/boardSlice'
import { listReducer } from './features/listSlice'
import { cardReducer } from './features/cardsSlice'
export const store = configureStore({
    reducer: {
        board: boardReducer,
        lists: listReducer,
        cards: cardReducer
    }
})