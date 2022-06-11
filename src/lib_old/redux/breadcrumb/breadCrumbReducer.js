import { UPDATE_BC } from "./breadCrumbType"

const intialState = {
    crumbs: []
}

const breadcrumbReducer = (state = intialState, action) => {
    switch (action.type) {
        case UPDATE_BC: return {
            ...state,
            crumbs: action.payload
        }
        default:
            return state;
    }

}

export default breadcrumbReducer;