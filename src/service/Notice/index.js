import { APICore } from '../../helpers/api/apiCore';

const api = new APICore();

export const getAllNotice = async (from) => {
    const baseUrl = '/otcbuy/notices';
    const params = { from, count: 5 };
    return await api.get(baseUrl, params).then((resp) => resp.data.data.notices);
};
