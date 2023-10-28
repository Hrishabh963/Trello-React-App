import axios from "axios";
const key =
    import.meta.env.VITE_API_KEY;
const token =
    import.meta.env.VITE_API_TOKEN;


//Function to post list
export const postListData = async(name, id) => {
    if (name === '') return;
    try {
        const response = await axios.post(`https://api.trello.com/1/lists?name=${name}&idBoard=${id}&key=${key}&token=${token}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

//Function to get all list
export const getListData = async(id) => {
    try {
        const response = await axios.get(
            `https://api.trello.com/1/boards/${id}/lists?key=${
          key
        }&token=${token}`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

///Function to get parent board's color/bgImage
export const getParentData = async(id) => {
    try {
        const response = await axios.get(`https://api.trello.com/1/boards/${id}?fields=name,id,prefs&key=${key}&token=${token}`);
        return response.data.prefs;
    } catch (error) {
        throw error;
    }
}

export const deleteList = async(listId) => {
    try {
        const response = await axios.put(`https://api.trello.com/1/lists/${listId}/closed?key=${key}&token=${token}&value=true`)
        return response.data;
    } catch (error) {
        throw error;
    }
}