import axios, {AxiosError} from "axios";


const URL ="http://127.0.0.1:8000"

const getCart = async (token: string) => {
    try {
        const response = await axios.get(`${URL}/divine/cart/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error: any) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 401) {
            throw new Error("Token is invalid or has expired");
        } else {
            throw error;
        }
    }
};

const postToCart = async (token: string, id: number, add: boolean) => {
    try {
        const response = await axios.post(`${URL}/divine/cart/${add? "add":"sub"}/${id}/`,"",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


const delOutCart = async (token: string, id: number) => {
    try {
        const response = await axios.post(`${URL}/divine/cart/del/${id}/`,"",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const addToCartWithEmail = async (
    id: number,
    email: string,
    token: string
) => {
    try {
        const body = {
            email: email,
        };
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        const response = await axios.post(
            `${URL}/divine/cart-with-email/${id}/`,
            body,
            config
        );
        return response.data;
    } catch (error: any) {
        const axiosError = error as AxiosError;
        if(axiosError.response && axiosError.response.status===404) {
            throw new Error("Cannot find software");
        }

        if(axiosError.response && axiosError.response.status===400) {
            throw new Error("Please enter your email");
        }

        if(axiosError.response && axiosError.response.status===401) {
            throw new Error("token_expire");
        }

        else {
            throw error;
        }
    }
};


export const cartService = {
    getCart,
    postToCart,
    addToCartWithEmail,
    delOutCart,
};