import axios from 'axios';
import { base_url } from '../../utils/base_url';

export const getEnquiries = async () => {
    const respone = await axios.get(`${base_url}/enquiry`);
    return respone.data;
};

const enquiryService = {
    getEnquiries,
};

export default enquiryService;
