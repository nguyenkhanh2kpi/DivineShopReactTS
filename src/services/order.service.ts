import axios, { AxiosError } from "axios";

const URL = "http://127.0.0.1:8000";

interface ResponseError {
    status?: string;
    message?: string;
}

const postOrder = async (token: string) => {
    try {
        const response = await axios.post(
            `${URL}/divine/order/`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error: any) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 400) {
            if (
                axiosError.response.data &&
                typeof axiosError.response.data === "object"
            ) {
                const errorResponse: ResponseError = axiosError.response.data;

                if (errorResponse.message) {
                    throw new Error(errorResponse.message);
                }
            } else {
                throw new Error("Invalid response format");
            }
        } else if (axiosError.response && axiosError.response.status === 401) {
            throw new Error("token_expire");
        } else {
            throw error;
        }
    }
};


const getMyOrderDetail = async (token: string) => {
    try {
        const response = await axios.get(`${URL}/divine/orders/all/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 401) {
            throw new Error("token_expire");
        } else {
            throw error;
        }
    }
};

const getOrderDetailByID = async (token: string, id: number) => {
    try {
        const response = await axios.get(`${URL}/divine/order-detail/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 401) {
            throw new Error("token_expire");
        } else {
            throw error;
        }
    }
};




export const orderService = {
    postOrder,
    getMyOrderDetail,
    getOrderDetailByID,
};
