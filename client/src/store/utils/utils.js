export function replaceElemInArray(items, newElement, filterFunc) {
    const replaceIndex = items.findIndex(filterFunc);
    return [
            ...items.slice(0, replaceIndex),
            newElement,
            ...items.slice(replaceIndex + 1)
        ];
}

export const getError = (error, defaultMessage = 'Error occurred. Try again later.') => {
    const { error: message } = error.response.data;
    return (message) ? message : defaultMessage; 
}

export const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const formResponsiveAttributes = {
    xs: {span: 18, offset: 3},
    sm: {span: 16, offset: 4},
    md: {span: 12, offset: 6},
    lg: {span: 8, offset: 8},
    xl: {span: 6, offset: 9} 
};

