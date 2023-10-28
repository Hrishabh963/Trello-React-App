import { configureStore } from '@reduxjs/toolkit'
import { boardReducer } from './features/boardSlice'
import { listReducer } from './features/listSlice'
import { cardReducer } from './features/cardsSlice'
import { checkListReducer } from './features/ChecklistSlice'
import { checkItemsReducer } from './features/checkItemsSlice'
export const store = configureStore({
    reducer: {
        board: boardReducer,
        lists: listReducer,
        cards: cardReducer,
        checklists: checkListReducer,
        checkitems: checkItemsReducer
    }
})