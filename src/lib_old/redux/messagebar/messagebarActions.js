import { SHOW_MESSAGE_BAR, HIDE_MESSAGE_BAR } from "./messagebarType"

export const showMessageBar = (messages, type) => {
    return {
        type: SHOW_MESSAGE_BAR,
        payload: messages,
        messageType: type
    }
}

export const hideMessageBar = () => {
    return {
        type: HIDE_MESSAGE_BAR
    }
}

