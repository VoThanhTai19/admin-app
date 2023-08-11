import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

export const login = async (userData) => {
    const respone = await axios.post(`${base_url}/user/admin-login`, userData);
    if (respone.data) {
        localStorage.setItem('user', JSON.stringify(respone.data));
    }
    return respone.data;
};

export const getOrders = async () => {
    const respone = await axios.get(`${base_url}/user/get-all-orders`, config);
    return respone.data;
};

const authService = {
    login,
    getOrders,
};

export default authService;
