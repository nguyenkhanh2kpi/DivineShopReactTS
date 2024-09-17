import axios, { AxiosError } from "axios";
import { ResetPassword } from "../pages/Password/Password";
const URL = "http://127.0.0.1:8000";



interface ErrorPasswordReset {
    new_password1?: string[];
    new_password2?: string[];
}

const resetPassword = async (form: ResetPassword, token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
        const response = await axios.post(
            `${URL}/account/dj-rest-auth/password/change/`,
            form,
            config
        );
        return response.data;
    } catch (error: any) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 400) {
            if (
                axiosError.response.data &&
                typeof axiosError.response.data === "object"
            ) {
                const errorResponse: ErrorPasswordReset =
                    axiosError.response.data;
                if (errorResponse.new_password1) {
                    throw new Error(errorResponse.new_password1[0]);
                }
                if (errorResponse.new_password2) {
                    throw new Error(errorResponse.new_password2[0]);
                }
            } else {
                throw new Error("Invalid response format");
            }
        }

        if (axiosError.response && axiosError.response.status === 401) {
            throw new Error("token_expire");
        } else {
            throw error;
        }
    }
};

export const passwordService = {
    resetPassword,
};
