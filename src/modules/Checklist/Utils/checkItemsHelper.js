export const initalState = {
    checkItems: [],
    percentage: 0,
    error: false,
    loading: true,
    inputValue: ''
}

export const calculatePercentage = (checkItems) => {
    const total = checkItems.length;
    if (total === 0) return 0;
    let checked = 0;
    for (const checkItem of checkItems) {
        if (checkItem.state === 'complete')
            checked++;
    }
    const percentage = ((checked / total) * 100).toFixed(0);
    return percentage;
}

export const changeState = (checked, id, checkItems) => {
    const status = checked ? "complete" : "incomplete";
    const UpdatedData = checkItems.map((checkItem) => {
        if (checkItem.id === id) {
            return {...checkItem, state: status }
        } else return checkItem;
    })
    return UpdatedData;
}
export const reducer = (state, action) => {
    switch (action.type) {
        case "fetch":
            {
                return {
                    ...state,
                    checkItems: action.payload,
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
                    checkItems: [...state.checkItems, action.payload]
                }
            }
        case "delete":
            {
                return {
                    ...state,
                    checkItems: state.checkItems.filter((checkItem) => checkItem.id !== action.payload)
                }
            }
        case "setInput":
            {
                return {
                    ...state,
                    inputValue: action.payload
                }
            }
        case "setPercentage":
            {
                return {
                    ...state,
                    percentage: calculatePercentage(state.checkItems)
                }
            }
        case "changeState":
            {
                return {
                    ...state,
                    checkItems: changeState(action.payload.check, action.payload.id, state.checkItems)
                }
            }
        default:
            return state;
    }
}