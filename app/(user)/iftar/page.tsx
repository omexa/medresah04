'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const API_URL = 'https://alhudaic.ca/api/Iftar_niyah.php'; // Replace with your actual backend URL

const IftarNiyahForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    forHowManyDays: '',
    niyah_detail: '',
    amount: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Add 'addNiyah' field to indicate the request type
      const payload = { ...formData, addNiyah: 'true' };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      alert(result.message);

      if (result.success) {
        setFormData({
          fullname: '',
          email: '',
          phone: '',
          forHowManyDays: '',
          niyah_detail: '',
          amount: '',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Unable to submit Iftar Niyah! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>
        Ramadan Iftar Donation Form
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Full Name */}
        <div>
          <Label>Full Name</Label>
          <Input
            type='text'
            name='fullname'
            value={formData.fullname}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div>
          <Label>Email</Label>
          <Input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div>
          <Label>Phone</Label>
          <Input
            type='tel'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* For How Many Days */}
        <div>
          <Label>For How Many Days (Optional)</Label>
          <Input
            type='number'
            name='forHowManyDays'
            value={formData.forHowManyDays}
            onChange={handleChange}
            min={0}
          />
        </div>

        {/* Niyah Detail */}
        <div>
          <Label>Niyah Detail (Optional)</Label>
          <Textarea
            name='niyah_detail'
            value={formData.niyah_detail}
            onChange={handleChange}
          />
        </div>

        {/* Amount */}
        <div>
          <Label>Amount (Optional)</Label>
          <Input
            type='number'
            name='amount'
            value={formData.amount}
            onChange={handleChange}
            min={0}
          />
        </div>

        {/* Submit Button */}
        <Button type='submit' disabled={loading} className='w-full mt-6'>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
};

export default IftarNiyahForm;