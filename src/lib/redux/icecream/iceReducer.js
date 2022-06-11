import { BUY_ICE } from "./iceType"

const intialState = {
    ice: 20
}

const iceReducer = (state = intialState, action) => {
    switch (action.type) {
        case BUY_ICE: return {
            ...state,
            ice: state.ice - 1
        }
        default:
            return state;
    }

}

export default iceReducer;