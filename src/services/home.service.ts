import axios from "axios";


const URL ="http://127.0.0.1:8000"

const getSlider = async () => {
    try {
        const response = await axios.get(`${URL}/home/slider`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getCategory = async () => {
    try {
        const response = await axios.get(`${URL}/divine/categories/`);
        return response.data;
    }catch(error) {
        throw error;
    }
}


const getKeyword = async () => {
    try {
        const response = await axios.get(`${URL}/divine/keyword/`);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

const getBlogs = async () => {
    try {
        const response = await axios.get(`${URL}/divine/blogs/`);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}


const getBlogCategory= async () => {
    try {
        const response = await axios.get(`${URL}/divine/blog-category/`);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}



export const homeService = {
    getSlider,
    getCategory,
    getKeyword,
    getBlogs,
    getBlogCategory,
    
};
