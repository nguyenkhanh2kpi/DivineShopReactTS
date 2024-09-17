import axios, { AxiosError } from "axios";
import { RegisterForm } from "../pages/Account/Register";
import { UserInfoma, UserProfile } from "../pages/Profile/Profile";
const URL = "http://127.0.0.1:8000";

interface ErrorResponse {
    username?: string[];
    email?: string[];
    password1?: string[];
    password2?: string[];
}

interface ProfileErrorResponse {
    avatar?: string[];
    phone?: string[];
    identification_id?: string[];
    gender?: string[];
    province_city?: string[];
    district?: string[];
    wards?: string[];
}

interface UserInfoResponse {
    username?: string[];
    first_name?: string[];
    last_name?: string[];

}

const login = (username: string, password: string) => {
    const requestOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    };
    return fetch(`${URL}/account/dj-rest-auth/login/`, requestOption)
        .then(handleResponse)
        .then((response) => {
            sessionStorage.setItem("user", JSON.stringify(response));
            return response;
        });
};

const logout = () => {
    sessionStorage.removeItem("user");
};

const handleResponse = (response: any) => {
    return response.text().then((text: string) => {
        const data = text && JSON.parse(text);
        console.log(data);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
            }
            const error =
                (data && data.non_field_errors) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
};

const register = async (form: RegisterForm) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await axios.post(
            `${URL}/account/dj-rest-auth/registration/`,
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
                const errorResponse: ErrorResponse = axiosError.response.data;

                if (errorResponse.username) {
                    throw new Error(errorResponse.username[0]);
                }

                if (errorResponse.email) {
                    throw new Error(errorResponse.email[0]);
                }

                if (errorResponse.password1) {
                    throw new Error(errorResponse.password1[0]);
                }

                if (errorResponse.password2) {
                    throw new Error(errorResponse.password2[0]);
                }
            } else {
                throw new Error("Invalid response format");
            }
        } else {
            throw error;
        }
    }
};

const getProfile = async (token: string) => {
    try {
        const response = await axios.get(`${URL}/account/profile/`, {
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

const initProfile = async (token: string) => {
    try {
        const response = await axios.get(`${URL}/account/new-profile/`, {
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

const updateProfile = async (form: UserProfile, token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
        const response = await axios.post(
            `${URL}/account/profile/update/`,
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
                const errorResponse: ProfileErrorResponse =
                    axiosError.response.data;
                if (errorResponse.avatar) {
                    throw new Error(errorResponse.avatar[0]);
                }
                if (errorResponse.phone) {
                    throw new Error(errorResponse.phone[0]);
                }
                if (errorResponse.identification_id) {
                    throw new Error(errorResponse.identification_id[0]);
                }
                if (errorResponse.gender) {
                    throw new Error(errorResponse.gender[0]);
                }
                if (errorResponse.province_city) {
                    throw new Error(errorResponse.province_city[0]);
                }
                if (errorResponse.district) {
                    throw new Error(errorResponse.district[0]);
                }
                if (errorResponse.wards) {
                    throw new Error(errorResponse.wards[0]);
                }
            } else {
                throw new Error("Invalid response format");
            }
        } 
        
        if(axiosError.response && axiosError.response.status === 401) {
            throw new Error("token_expire");
        }
        else  {
            throw error;
        }
    }
};


const updateUser = async (form: UserInfoma, token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
        const response = await axios.put(
            `${URL}/account/dj-rest-auth/user/`,
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
                const errorResponse: UserInfoResponse =
                    axiosError.response.data;
                if (errorResponse.username) {
                    throw new Error(errorResponse.username[0]);
                }
                if (errorResponse.first_name) {
                    throw new Error(errorResponse.first_name[0]);
                }
                if (errorResponse.last_name) {
                    throw new Error(errorResponse.last_name[0]);
                }
            } else {
                throw new Error("Invalid response format");
            }
        } 
        
        if(axiosError.response && axiosError.response.status === 401) {
            throw new Error("token_expire");
        }
        else  {
            throw error;
        }
    }
};


const getUserInform = async (token: string) => {
    try {
        const response = await axios.get(`${URL}/account/dj-rest-auth/user/`, {
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

export const userService = {
    login,
    logout,
    register,
    getProfile,
    updateProfile,
    updateUser,
    getUserInform,
    initProfile,
};
