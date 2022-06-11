import { UPDATE_BC } from "./breadCrumbType"

export const updateBC = (num = 1) => {
    return {
        type: UPDATE_BC,
        payload: num
    }
}

