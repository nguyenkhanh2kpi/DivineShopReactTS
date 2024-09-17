import axios from "axios";



const getCity= async () => {
    try {
        const response = await axios.get(`https://provinces.open-api.vn/api/`);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

const getDistric= async (id: number) => {
    try {
        const response = await axios.get(`https://provinces.open-api.vn/api/p/${id}?depth=2`);
        return response.data.districts;
    }
    catch (error) {
        throw error;
    }
}


const getWard= async (code: number) => {
    try {
        const response = await axios.get(`https://provinces.open-api.vn/api/d/${code}?depth=2`);
        return response.data.wards;
    }
    catch (error) {
        throw error;
    }
}

export const locationService = {
    getCity,
    getDistric,
    getWard,
};
