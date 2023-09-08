import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

export const getColors = async () => {
    const respone = await axios.get(`${base_url}/color`);
    return respone.data;
};

export const getColor = async (id) => {
    const respone = await axios.get(`${base_url}/color/${id}`);
    return respone.data;
};

export const createColor = async (data) => {
    const res = await axios.post(`${base_url}/color/new-color`, data, config);
    return res.data;
};

export const updateColor = async (data) => {
    const res = await axios.put(
        `${base_url}/color/update/${data.id}`,
        { title: data.colorName.title },
        config,
    );
    return res.data;
};

export const deleteColor = async (id) => {
    const res = await axios.delete(`${base_url}/color/delete/${id}`, config);
    return res.data;
};

const colorService = {
    getColors,
    getColor,
    createColor,
    updateColor,
    deleteColor,
};

export default colorService;
