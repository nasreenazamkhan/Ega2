export const getQueryParams = (queryString) => {
    queryString = decodeURI(queryString);
    if (queryString.startsWith("?")) {
        queryString = queryString.substring(1, queryString.length);
    }
    let strArr = queryString.split('&');
    let queryParams = {};

    for (let i = 0; i < strArr.length; i++) {
        queryParams[strArr[i].split('=')[0]] = strArr[i].split('=')[1];
    }
    return queryParams;
}


export const isNumericKey = (e) => {
    return ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105))
}

export const isBackSpace = (e) => {
    return ((e.keyCode === 46))
}

export const isDelete = (e) => {
    return ((e.keyCode === 8))
}

export const isDeleteKeys = (e) => {
    return isBackSpace(e) || isDelete(e);
}

export const isNavigationKeys = (e) => {
    return (e.keyCode >= 37 && e.keyCode <= 40)
}