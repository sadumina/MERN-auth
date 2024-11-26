import axios from 'axios';

const BASE_URL = 'http://localhost:8081';

export const getCustomerByUserId = (userId) => {
    return axios.get(`${BASE_URL}/customer/search/uid/${userId}`);
};

export const updateCustomer = (nic, customerData) => {
    return axios.put(`${BASE_URL}/customer/update/${nic}`, {
        name: customerData.name,
        mobile: customerData.mobile,
        nic: customerData.nic
    });
};

export const deleteCustomer = (nic) => {
    return axios.delete(`${BASE_URL}/customer/delete/${nic}`);
};

