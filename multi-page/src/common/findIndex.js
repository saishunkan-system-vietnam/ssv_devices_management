export const findIndex = (array, id)=> {
    var result = -1;
    array.forEach((array, index) => {
        if (array.id === id) {
            result = index;
        }
    });
    return result;
}