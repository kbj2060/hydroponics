export const checkEmpty = (value) => {
    if ( value === undefined || value === "" || value === null || (typeof value === "object" && !Object.keys(value).length)){
        return true;
    }
}