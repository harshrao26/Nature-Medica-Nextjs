'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/store/slices/userSlice'; // Changed from updateUserProfile

export default function AddressForm({ onSuccess }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    pincode: user?.address?.pincode || '',
    landmark: user?.address?.landmark || ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update user profile via API
      const res = await fetch('/api/user/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            landmark: formData.landmark
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        
        // Update Redux store with new user data
        dispatch(setUser(data.user));
        
        if (onSuccess) onSuccess();
        alert('Address saved successfully!');
      } else {
        alert('Failed to save address');
      }
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Error saving address');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold mb-2">Full Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full border-2 rounded-lg px-4 py-2"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">Phone Number *</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          pattern="[0-9]{10}"
          className="w-full border-2 rounded-lg px-4 py-2"
          placeholder="10-digit mobile number"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">Street Address *</label>
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleInputChange}
          required
          className="w-full border-2 rounded-lg px-4 py-2"
          placeholder="House No., Building Name, Street"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-2">City *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
            className="w-full border-2 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">State *</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
            className="w-full border-2 rounded-lg px-4 py-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-2">Pincode *</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            required
            pattern="[0-9]{6}"
            className="w-full border-2 rounded-lg px-4 py-2"
            placeholder="6-digit pincode"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Landmark</label>
          <input
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleInputChange}
            className="w-full border-2 rounded-lg px-4 py-2"
            placeholder="Optional"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#3a5d1e] text-white py-3 rounded-lg font-bold hover:bg-[#2d4818] disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Save Address'}
      </button>
    </form>
  );
}
