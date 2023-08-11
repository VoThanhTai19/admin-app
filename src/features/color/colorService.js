import axios from 'axios';
import { base_url } from '../../utils/base_url';

export const getColors = async () => {
    const respone = await axios.get(`${base_url}/color`);
    return respone.data;
};

const colorService = {
    getColors,
};

export default colorService;
