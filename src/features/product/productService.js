import axios from 'axios';
import { base_url } from '../../utils/base_url';

export const getProducts = async () => {
    const respone = await axios.get(`${base_url}/product`);
    return respone.data;
};

const productService = {
    getProducts,
};

export default productService;
