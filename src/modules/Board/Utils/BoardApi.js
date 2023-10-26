import axios from "axios";
const key =
    import.meta.env.VITE_API_KEY;
const token =
    import.meta.env.VITE_API_TOKEN;


export const getBoards = async() => {
    try {
        const response = await axios.get(
            `https://api.trello.com/1/members/me/boards?fields=name,id,prefs&key=${
          key
        }&token=${token}`
        );
        console.log(response.status);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const postBoard = async(input) => {
    try {
        const response = await axios.post(`https://api.trello.com/1/boards/?name=${input}&key=${key}&token=${token}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}