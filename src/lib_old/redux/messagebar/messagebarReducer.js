import { SHOW_MESSAGE_BAR, HIDE_MESSAGE_BAR } from "./messagebarType"



const intialState = {
    messages: [],
    messageType: 0,
    show: false
}

const messagebarReducer = (state = intialState, action) => {
    switch (action.type) {
        case SHOW_MESSAGE_BAR: return {
            ...state,
            messages: action.payload,
            messageType: action.messageType,
            show: true
        }
        case HIDE_MESSAGE_BAR: return {
            ...state,
            messages: [],
            messageType: 0,
            show: false
        }
        default:
            return state;
    }

}

export default messagebarReducer;