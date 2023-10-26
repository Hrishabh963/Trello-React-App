import axios from "axios";
const key =
    import.meta.env.VITE_API_KEY;
const token =
    import.meta.env.VITE_API_TOKEN;

export const getChecklists = async(cardId) => {
    try {
        const response = await axios.get(`https://api.trello.com/1/cards/${cardId}/checklists?key=${key}&token=${token}`)
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addChecklist = async(cardId, name) => {
    try {
        const response = await axios.post(`https://api.trello.com/1/checklists?idCard=${cardId}&key=${key}&token=${token}&name=${name}`)
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteChecklist = async(checkListId) => {
    try {
        const response = await axios.delete(`https://api.trello.com/1/checklists/${checkListId}?key=${key}&token=${token}`);
        return response.status;
    } catch (error) {
        throw error;
    }
}