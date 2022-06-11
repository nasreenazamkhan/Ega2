import { SHOW_SPINNER, HIDE_SPINNER } from "./spinType"

const intialState = {
    loading: false
}

const spinReducer = (state = intialState, action) => {
    switch (action.type) {
        case SHOW_SPINNER: return {
            ...state,
            loading: true
        }
        case HIDE_SPINNER: return {
            ...state,
            loading: false
        }
        default:
            return state;
    }

}

export default spinReducer;