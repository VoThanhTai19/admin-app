import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

export const getBlogs = async () => {
    const respone = await axios.get(`${base_url}/blog`);
    return respone.data;
};

export const createBlog = async (data) => {
    const res = await axios.post(`${base_url}/blog/new-blog`, data, config);
    return res.data;
};

export const deleteBlog = async (id) => {
    const res = await axios.delete(`${base_url}/blog/delete/${id}`, config);
    return res.data;
};

const blogService = {
    getBlogs,
    createBlog,
    deleteBlog,
};

export default blogService;
