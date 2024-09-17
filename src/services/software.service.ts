import axios, { AxiosError } from "axios";
const URL ="http://127.0.0.1:8000"

const getSoftwareById = async (id: number) => {
    try {
        const response = await axios.get(
            `${URL}/divine/software/${id}/`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getCommentsBySoftwareId = async (id: number) => {
    try {
        const response = await axios.get(
            `${URL}/divine/comments/${id}/`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

const addComment = async (id: number, text: string, token: string) => {
    try {
        const commentData = {
            text: text,
        };
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        const response = await axios.post(
            `${URL}/divine/comment/add/${id}/`,
            commentData,
            config
        );
        return response.data;
    } catch  (error: any) {
        const axiosError = error as AxiosError;
        if(axiosError.response && axiosError.response.status===401) {
            throw new Error("token_expire");
        }
        else {
            throw new Error(error);
        }
    }
};

const reply = async (id: number,parent: number,text: string, token: string) => {
    try {
        const commentData = {
            text: text,
            parent: parent,
        };
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        const response = await axios.post(
            `${URL}/divine/comment/add/${id}/`,
            commentData,
            config
        );
        return response.data;
    } catch (error: any) {
        const axiosError = error as AxiosError;
        if(axiosError.response && axiosError.response.status===401) {
            throw new Error("token_expire");
        }
        else {
            throw new Error(error.data);
        }
    }
};




export const softwareService = {
    getSoftwareById,
    getCommentsBySoftwareId,
    addComment,
    reply,
};
