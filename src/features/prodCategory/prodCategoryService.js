import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

export const getProdCategories = async () => {
    const respone = await axios.get(`${base_url}/category`);
    return respone.data;
};

export const createProdCategory = async (data) => {
    const res = await axios.post(`${base_url}/category/new-category`, data, config);
    return res.data;
};

export const deleteProdCategory = async (id) => {
    const res = await axios.delete(`${base_url}/category/delete/${id}`, config);
    return res.data;
};

const prodCategoryService = {
    getProdCategories,
    createProdCategory,
    deleteProdCategory,
};

export default prodCategoryService;
