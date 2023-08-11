import axios from 'axios';
import { base_url } from '../../utils/base_url';

export const getProdCategories = async () => {
    const respone = await axios.get(`${base_url}/category`);
    return respone.data;
};

const prodCategoryService = {
    getProdCategories,
};

export default prodCategoryService;
