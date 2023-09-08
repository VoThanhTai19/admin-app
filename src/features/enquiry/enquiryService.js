import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

export const getEnquiries = async () => {
    const respone = await axios.get(`${base_url}/enquiry`);
    return respone.data;
};

export const getEnquiry = async (id) => {
    const respone = await axios.get(`${base_url}/enquiry/${id}`);
    return respone.data;
};

export const updateEnquiry = async (id) => {
    const respone = await axios.delete(`${base_url}/enquiry/update/${id}`, config);
    return respone.data;
};

export const deleteEnquiry = async (id) => {
    const respone = await axios.delete(`${base_url}/enquiry/delete/${id}`, config);
    return respone.data;
};

const enquiryService = {
    getEnquiries,
    getEnquiry,
    updateEnquiry,
    deleteEnquiry,
};

export default enquiryService;
