import axios from 'axios';

const BASE_URL = 'http://localhost:8081';

export const loginUser = async (credentials) => {
    const response = await axios.post(`${BASE_URL}/user/login`, credentials);
    const userData = response.data;
    
    
    if (userData.userType === 'EMPLOYEE') {
        const employeeResponse = await axios.get(`${BASE_URL}/employee/search/uid/${userData.userId}`);
        return {
            ...userData,
            employeeDetails: employeeResponse.data
        };
    } else if (userData.userType === 'CUSTOMER') {
        const customerResponse = await axios.get(`${BASE_URL}/customer/search/uid/${userData.userId}`);
        return {
            ...userData,
            customerDetails: customerResponse.data
        };
    }
    return userData;
    
};
