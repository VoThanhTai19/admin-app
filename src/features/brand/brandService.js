import axios from 'axios';
import { base_url } from '../../utils/base_url';

export const getBrands = async () => {
    const respone = await axios.get(`${base_url}/brand`);
    return respone.data;
};

const brandService = {
    getBrands,
};

export default brandService;
