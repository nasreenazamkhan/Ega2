import { BOOK_CONTAINER, CANCEL_CONTAINER } from "./containerType"



const intialState = {
    containerNumber: [],
    booked: false
}

const containerReducer = (state = intialState, action) => {
    switch (action.type) {
        case BOOK_CONTAINER: return {
            ...state,
            containerNumber: action.payload,
            booked: true
        }
        case CANCEL_CONTAINER: return {
            ...state,
            containerNumber: action.payload,
            booked: false
        }
        default:
            return state;
    }

}

export default containerReducer;