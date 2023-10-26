export const initalState = {
    data: undefined,
    error: false,
    loading: true,
    input: ''
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "fetch":
            {
                return {
                    ...state,
                    data: action.payload,
                    loading: false,
                };
            }
        case "post":
            {
                return {
                    ...state,
                    data: [...state.data, action.payload],
                    loading: false,
                    error: false
                }
            }
        case "setInput":
            {
                return {
                    ...state,
                    input: action.payload
                }
            }
        default:
            return state;
    }
};