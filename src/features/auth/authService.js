import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const login = async (userData) => {
    const respone = await axios.post(`${base_url}/user/admin-login`, userData);
    if (respone.data) {
        localStorage.setItem('user', JSON.stringify(respone.data));
    }
    return respone.data;
};

const getOrders = async () => {
    const respone = await axios.get(`${base_url}/user/get-all-orders`, config);
    return respone.data;
};

const getOrder = async (id) => {
    const respone = await axios.get(`${base_url}/user/get-order/${id}`, config);
    return respone.data;
};

const getOrderByUser = async (id) => {
    const respone = await axios.get(`${base_url}/user/get-orders/${id}`, config);
    return respone.data;
};

const updateOrder = async (data) => {
    const respone = await axios.put(
        `${base_url}/user/order/update/${data.id}`,
        { status: data.status },
        config,
    );
    return respone.data;
};

const getMonthlyOrders = async () => {
    const respone = await axios.get(`${base_url}/user/get-month-wise-order-income`, config);
    return respone.data;
};

const getYearlyOrders = async () => {
    const respone = await axios.get(`${base_url}/user/get-yearly-total-orders`, config);
    return respone.data;
};

const authService = {
    login,
    getOrders,
    getOrderByUser,
    getMonthlyOrders,
    getYearlyOrders,
    getOrder,
    updateOrder,
};

export default authService;
