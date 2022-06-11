import { SHOW_SPINNER, HIDE_SPINNER } from "./spinType"

export const showSpinner = () => {
    return {
        type: SHOW_SPINNER
    }
}

export const hideSpinner = () => {
    return {
        type: HIDE_SPINNER
    }
}

