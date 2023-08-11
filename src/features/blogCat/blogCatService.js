import axios from 'axios';
import { base_url } from '../../utils/base_url';

export const getBlogCategories = async () => {
    const respone = await axios.get(`${base_url}/blog-category`);
    return respone.data;
};

const blogCatService = {
    getBlogCategories,
};

export default blogCatService;
