import { CANCEL_CONTAINER, BOOK_CONTAINER } from "./containerType"

export const bookContainer = (container) => {
    return {
        type: BOOK_CONTAINER,
        payload: container
    }
}

export const cancelContainer = (container) => {
    return {
        payload: container,
        type: CANCEL_CONTAINER
    }
}

