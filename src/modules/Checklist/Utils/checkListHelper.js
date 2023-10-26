export const checkListinitalState = {
    checkLists: [],
    error: false,
    loading: true,
    inputValue: ''
}


export const checkListReducer = (state, action) => {
    switch (action.type) {
        case "fetch":
            {
                return {
                    ...state,
                    checkLists: action.payload,
                    error: false,
                    loading: false
                }
            }
        case "error":
            {
                return {
                    ...state,
                    error: true,
                    loading: false
                }
            }
        case "post":
            {
                return {
                    ...state,
                    checkLists: [...state.checkLists, action.payload]
                }
            }
        case "delete":
            {
                return {
                    ...state,
                    checkLists: state.checkLists.filter((checklist) => checklist.id !== action.payload)
                }
            }
        case "setInput":
            {
                return {
                    ...state,
                    inputValue: action.payload
                }
            }
        default:
            return state;
    }
}