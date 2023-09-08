import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

export const getBrands = async () => {
    const respone = await axios.get(`${base_url}/brand`);
    return respone.data;
};

export const getBrand = async (id) => {
    const respone = await axios.get(`${base_url}/brand/${id}`);
    return respone.data;
};

export const createBrand = async (data) => {
    const res = await axios.post(`${base_url}/brand/new-brand`, data, config);
    return res.data;
};

export const updateBrand = async (data) => {
    const res = await axios.put(
        `${base_url}/brand/update/${data.brandId}`,
        { title: data.brandName.title },
        config,
    );
    return res.data;
};

export const deleteBrand = async (id) => {
    const res = await axios.delete(`${base_url}/brand/delete/${id}`, config);
    return res.data;
};

const brandService = {
    getBrands,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand,
};

export default brandService;
