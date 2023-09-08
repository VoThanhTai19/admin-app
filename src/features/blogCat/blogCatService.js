import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

export const getBlogCategories = async () => {
    const respone = await axios.get(`${base_url}/blog-category`);
    return respone.data;
};

export const getBlogCategory = async (id) => {
    const respone = await axios.get(`${base_url}/blog-category/${id}`);
    return respone.data;
};

export const createBlogCategory = async (data) => {
    const res = await axios.post(`${base_url}/blog-category/new-blog-category`, data, config);
    return res.data;
};

export const updateBlogCategory = async (data) => {
    const res = await axios.put(
        `${base_url}/blog-category/update/${data.id}`,
        { title: data.blogCatData.title },
        config,
    );
    return res.data;
};

export const deleteBlogCategory = async (id) => {
    const res = await axios.delete(`${base_url}/blog-category/delete/${id}`, config);
    return res.data;
};

const blogCatService = {
    getBlogCategories,
    getBlogCategory,
    createBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
};

export default blogCatService;
