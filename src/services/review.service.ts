import axios from "axios";
import { SoftwareReview } from "../pages/SoftwareDetail/SoftwareReview";

const URL = "http://127.0.0.1:8000";

const getReviewByid = async (id: number) => {
    try {
        const response = await axios.get(`${URL}/divine/rating/${id}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const postReview = async (review: SoftwareReview, token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
        const response = await axios.post(
            `${URL}/divine/rating/add/`,
            review,
            config
        );
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 403) {
            throw new Error("order");
        }
        
        if(error.response && error.response.status===401) {
            throw new Error("token_expired")
        }
        else {
            throw error;
        }
    }
};

export const reviewService = {
    getReviewByid,
    postReview,
};
