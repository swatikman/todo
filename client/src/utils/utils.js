


export function replaceElemInArray(items, newElement, filterFunc) {
    const replaceIndex = items.findIndex(filterFunc);
    return [
            ...items.slice(0, replaceIndex),
            newElement,
            ...items.slice(replaceIndex + 1)
        ];
}