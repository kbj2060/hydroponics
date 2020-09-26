const checkEmpty = (value) => {
    if ( value === [] || value === undefined || value === "" || value === null || (typeof value === "object" && !Object.keys(value).length)){
        return true;
    }
}

exports.checkEmpty = checkEmpty