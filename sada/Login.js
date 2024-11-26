import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../Service/loginService';
  const Login = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const userData = await loginUser(formData);
      
      
        let userRole = '';
        if (userData.userType === 'EMPLOYEE') {
          userRole = userData.employeeDetails.role.toLowerCase();
        } else if (userData.userType === 'CUSTOMER') {
          userRole = 'customer';
        }
      

        // Save complete user data in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('userRole', userRole);

        navigate('/dashboard', { state: { userRole } });
        window.location.reload();
      } catch (error) {
        alert('Invalid email or password');
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center relative">
        {/* Background Image with Blur */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/Images/slid 1.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px)',
            transform: 'scale(1.0)'
          }}
        />
      
        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-xl w-96 z-10">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    );
  };
export default Login;
