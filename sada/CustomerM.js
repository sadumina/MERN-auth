import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { updateCustomer, deleteCustomer} from '../Service/customerService';

const CustomerProfile = () => {
  const [customer, setCustomer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    mobile: '',
    nic: ''
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData?.customerDetails) {
      setCustomer(userData.customerDetails);
      setEditForm({
        name: userData.customerDetails.name,
        mobile: userData.customerDetails.mobile,
        nic: userData.customerDetails.nic
      });
    }
  }, []);

  const validateMobile = (mobile) => {
    const mobileRegex = /^(?:\+94|0)?[0-9]{9}$/;
    return mobileRegex.test(mobile);
  };

  const handleUpdate = async () => {
    if (!validateMobile(editForm.mobile)) {
      alert('Please enter a valid mobile number');
      return;
    }

    try {
      await updateCustomer(customer.nic, editForm);
      
      // Update local state
      setCustomer({ ...customer, ...editForm });
      
      // Update localStorage
      const userData = JSON.parse(localStorage.getItem('user'));
      userData.customerDetails = { ...userData.customerDetails, ...editForm };
      localStorage.setItem('user', JSON.stringify(userData));
      
      setIsEditing(false);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Update error:', error);
      alert('Error updating profile');
    }
};

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteCustomer(customer.nic);
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        window.location.href = '/';
      } catch (error) {
        alert('Error deleting account');
      }
    }
  };

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Customer Profile</h2>
      
      <div className="space-y-4">
        {isEditing ? (
          // Edit Form
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Mobile</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={editForm.mobile}
                    onChange={(e) => setEditForm({...editForm, mobile: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">NIC</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={editForm.nic}
                    onChange={(e) => setEditForm({...editForm, nic: e.target.value})}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Display Profile
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-bold">Name:</p>
                <p>{customer.name}</p>
              </div>
              <div>
                <p className="font-bold">Email:</p>
                <p>{customer.user?.email}</p>
              </div>
              <div>
                <p className="font-bold">Mobile:</p>
                <p>{customer.mobile}</p>
              </div>
              <div>
                <p className="font-bold">NIC:</p>
                <p>{customer.nic}</p>
              </div>
              <div>
                <p className="font-bold">Credit Amount:</p>
                <p>Rs. {customer.creditAmount.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="mt-6 space-x-4">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit Profile
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CustomerM = () => {
  return (
    <Routes>
      <Route path="profile" element={<CustomerProfile />} />
    </Routes>
  );
};

export default CustomerM;
