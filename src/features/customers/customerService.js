import axios from 'axios';
import { base_url } from '../../utils/base_url';

export const getUsers = async () => {
    const respone = await axios.get(`${base_url}/user/all-users`);
    return respone.data;
};

const customerService = {
    getUsers,
};

export default customerService;
