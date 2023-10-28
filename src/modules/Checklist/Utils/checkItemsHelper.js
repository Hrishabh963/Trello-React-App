export const calculatePercentage = (checkItems) => {
    if (!checkItems) return 0;
    const total = checkItems.length;
    if (total === 0) return 0;
    let checked = 0;
    for (const checkItem of checkItems) {
        if (checkItem.state === 'complete')
            checked++;
    }
    const percentage = ((checked / total) * 100).toFixed(0);
    return percentage;
}

export const changeState = (checked, id, checkItems) => {
    const status = checked ? "complete" : "incomplete";
    const UpdatedData = checkItems.map((checkItem) => {
        if (checkItem.id === id) {
            return {...checkItem, state: status }
        } else return checkItem;
    })
    return UpdatedData;
}