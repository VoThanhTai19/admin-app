import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

export const getCoupons = async () => {
    const respone = await axios.get(`${base_url}/coupon`);
    return respone.data;
};

export const getCoupon = async (id) => {
    const respone = await axios.get(`${base_url}/coupon/${id}`);
    return respone.data;
};

export const createCoupon = async (data) => {
    const res = await axios.post(`${base_url}/coupon/create`, data, config);
    return res.data;
};

export const updateCoupon = async (data) => {
    const res = await axios.put(`${base_url}/coupon/update/${data.id}`, data.couponData, config);
    return res.data;
};

export const deleteCoupon = async (id) => {
    const res = await axios.delete(`${base_url}/coupon/delete/${id}`, config);
    return res.data;
};

const couponService = {
    getCoupons,
    getCoupon,
    createCoupon,
    updateCoupon,
    deleteCoupon,
};

export default couponService;
