import axios from "axios";
const key =
    import.meta.env.VITE_API_KEY;
const token =
    import.meta.env.VITE_API_TOKEN;


export const getCheckItems = async(checkListId) => {
    try {
        const response = await axios.get(`https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${key}&token=${token}`)
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const postCheckItem = async(checkListId, name) => {
    try {
        const response = await axios.post(`https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${name}&key=${key}&token=${token}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteCheckItem = async(checkListId, checkItemId) => {
    try {
        const response = await axios.delete(`https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}?key=${key}&token=${token}`);
        return response.status;
    } catch (error) {
        throw error;
    }
}

export const updateCheckState = async(cardId, checkListId, checkItemId, checkItems, checked) => {
    try {
        const check = checked ? "complete" : "incomplete";
        let obj = checkItems.find(checkItem => checkItem.id === checkItemId);
        obj = {...obj, state: check };
        const response = await axios.put(`https://api.trello.com/1/cards/${cardId}/checklist/${checkListId}/checkItem/${checkItemId}?key=${key}&token=${token}`, obj);
        return response.data;
    } catch (error) {
        throw error;
    }
}