let _history = {
    'plant1' : [],
    'plant2' : [],
    'plant3' : []
}

_history['plant1'] = Object.values(JSON.parse(JSON.stringify([{'a':1}, {'b':1}])));
console.log(_history)