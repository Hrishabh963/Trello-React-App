export const listInitalState = {
    cards: [],
    loading: true,
    showForm: false,
    inputValue: ''
}

export const listContainerInitalState = {
    data: [],
    loading: true,
    boardColor: undefined,
    imgUrl: undefined,
    inputValue: ''
};

export const listReducer = (state, action) => {
    switch (action.type) {
        case "fetch":
            {
                return {
                    ...state,
                    cards: action.payload,
                    error: false,
                    loading: false
                }
            }
        case "post":
            {
                return {
                    ...state,
                    cards: [...state.cards, action.payload]
                }
            }
        case "deleteCard":
            {
                return {
                    ...state,
                    cards: state.cards.filter((card) => card.id !== action.payload)
                }
            }
        case "showForm":
            {
                return {
                    ...state,
                    showForm: !state.showForm
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


export const listContainerReducer = (state, action) => {
    switch (action.type) {
        case "fetch":
            {
                return {
                    ...state,
                    data: action.payload,
                    error: false,
                    loading: false,
                };
            }
        case "post":
            {
                return {
                    ...state,
                    data: [...state.data, action.payload],
                    error: false,
                    loading: false
                }
            }
        case "delete":
            {
                return {
                    ...state,
                    data: state.data.filter(list => list.id !== action.payload)
                }
            }
        case "setColor":
            {
                return {
                    ...state,
                    boardColor: action.payload.backgroundColor,
                    imgUrl: action.payload.backgroundImage
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
};