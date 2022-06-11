import { combineReducers } from 'redux';
import cakeReducer from './cake/cakeReducer';
import iceReducer from './icecream/iceReducer';
import userReducer from './user/userReducer';
import spinReducer from './spinner/spinReducer';
import messagebarReducer from './messagebar/messagebarReducer';
import breadcrumbReducer from './breadcrumb/breadCrumbReducer';
import loginUserReducer from './loginUserData/loginUserReducer';
import containerReducer from './container/containerReducer';

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceReducer,
    user: userReducer,
    spinner: spinReducer,
    messagebar: messagebarReducer,
    breadcrumb: breadcrumbReducer,
    loginUser: loginUserReducer,
    containerBook: containerReducer,
});

export default rootReducer;