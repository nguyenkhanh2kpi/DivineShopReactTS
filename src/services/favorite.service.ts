import axios, { AxiosError } from "axios";

const URL = "http://127.0.0.1:8000";

const getFavorite = async (token: string) => {
    try {
        const response = await axios.get(`${URL}/divine/favorite/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 404) {
            throw new Error("Your favorite is none");
        } else if (axiosError.response && axiosError.response.status === 401) {
            throw new Error("Token is invalid or has expired");
        } else {
            throw error;
        }
    }
};

const postFavorite = async (token: string, id: number) => {
    try {
        const response = await axios
            .post(
                `${URL}/divine/favorite/add/`,
                {
                    software_id: id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
    } catch (error) {
        throw error;
    }
};

const removeFavorite = async (token: string, id: number) => {
    try {
        const response = await axios
            .post(`${URL}/divine/remove_favorite/${id}/`, "", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
    } catch (error) {
        throw error;
    }
};

export const favoriteService = {
    getFavorite,
    postFavorite,
    removeFavorite,
};
