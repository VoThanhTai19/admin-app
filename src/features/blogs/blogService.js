import axios from 'axios';
import { base_url } from '../../utils/base_url';

export const getBlogs = async () => {
    const respone = await axios.get(`${base_url}/blog`);
    return respone.data;
};

const blogService = {
    getBlogs,
};

export default blogService;
