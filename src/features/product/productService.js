import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

export const getProducts = async () => {
    const respone = await axios.get(`${base_url}/product`);
    return respone.data;
};

export const createProduct = async (data) => {
    const res = await axios.post(`${base_url}/product/new-product`, data, config);
    return res.data;
};

export const deleteProduct = async (id) => {
    const res = await axios.delete(`${base_url}/product/delete/${id}`, config);
    return res.data;
};

const productService = {
    getProducts,
    createProduct,
    deleteProduct,
};

export default productService;
