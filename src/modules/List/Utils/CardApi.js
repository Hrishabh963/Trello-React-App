import axios from "axios";
const key =
    import.meta.env.VITE_API_KEY;
const token =
    import.meta.env.VITE_API_TOKEN;

export const getCards = async(id) => {
    try {
        const response = await axios.get(`https://api.trello.com/1/lists/${id}/cards?key=${key}&token=${token}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const postCard = async(name, id) => {
    try {
        const response = await axios.post(`https://api.trello.com/1/cards?idList=${id}&name=${name}&key=${key}&token=${token}`)
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteCard = async(id) => {
    try {
        const response = await axios.delete(`https://api.trello.com/1/cards/${id}?key=${key}&token=${token}`);
        return response.status;
    } catch (error) {
        throw error;
    }
}