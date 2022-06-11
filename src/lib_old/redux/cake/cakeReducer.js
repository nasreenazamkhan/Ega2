import { BUY_CAKE } from "./cakeType"

const intialState = {
    nc: 10
}

const cakeReducer = (state = intialState, action) => {
    switch (action.type) {
        case BUY_CAKE: return {
            ...state,
            nc: state.nc - action.payload
        }
        default:
            return state;
    }

}

export default cakeReducer;