import store from "../redux/store"
import { showSpinner, hideSpinner, showMessageBar, hideMessageBar, updateBC } from "../redux";


const getStoreState = () => {
    return store.getState();
}

const invokeStoreMethod = (method) => {
    store.dispatch(method);
}

export const startLoading = () => {
    invokeStoreMethod(showSpinner());

}

export const endLoading = () => {
    invokeStoreMethod(hideSpinner());
}

export const displayMessageBar = (msg, type) => {
    invokeStoreMethod(showMessageBar(msg, type));

}

export const dismissMessageBar = () => {
    invokeStoreMethod(hideMessageBar());

}

export const updateBreadCrumb = (msg) => {
    invokeStoreMethod(updateBC(msg))
}

export const loginUser = () => {

}

export const getLoginUserAccessToken = () => {
    return getStoreState().loginUser.user.access_token;

}

export const refreshUser = () => {

}