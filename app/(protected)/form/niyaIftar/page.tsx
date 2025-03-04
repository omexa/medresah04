// "use client";

// import { useEffect, useState } from "react";

// interface IftarNiyah {
//   id: number;
//   fullname: string;
//   email: string;
//   phone: string;
//   forHowManyDays: number;
//   niyah_detail: string;
//   amount: number;
//   recorded_at: string;
// }

// export default function IftarNiyahList() {
//   const [data, setData] = useState<IftarNiyah[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   //   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch("http://alhudaic.ca/api/iftar_niyah.php");

//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const result = await response.json();

//       if (Array.isArray(result)) {
//         setData(result);
//       } else {
//         throw new Error("Invalid data format");
//       }
//     } catch (error) {
//       //   setError(error.message);
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Iftar Niyah Donations</h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2">ID</th>
//               <th className="border p-2">Full Name</th>
//               <th className="border p-2">Email</th>
//               <th className="border p-2">Phone</th>
//               <th className="border p-2">Days</th>
//               <th className="border p-2">Detail</th>
//               <th className="border p-2">Amount</th>
//               <th className="border p-2">Recorded At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.length > 0 ? (
//               data.map((item) => (
//                 <tr key={item.id}>
//                   <td className="border p-2">{item.id}</td>
//                   <td className="border p-2">{item.fullname}</td>
//                   <td className="border p-2">{item.email}</td>
//                   <td className="border p-2">{item.phone}</td>
//                   <td className="border p-2">{item.forHowManyDays}</td>
//                   <td className="border p-2">{item.niyah_detail}</td>
//                   <td className="border p-2">${item.amount}</td>
//                   <td className="border p-2">
//                     {new Date(item.recorded_at).toLocaleString()}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={8} className="text-center p-4">
//                   No records found still.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// 'use client';
// import React, { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// import { Textarea } from '@/components/ui/textarea';

// const API_URL = 'https://alhudaic.ca/api/Iftar_niyah.php'; // Replace with your actual backend URL

// interface IftarNiyah {
//   id: number;
//   fullname: string;
//   email: string;
//   phone: string;
//   forHowManyDays: number;
//   niyah_detail: string;
//   amount: number;
//   recorded_at: string;
// }

// const IftarNiyahRecords: React.FC = () => {
//   const [donationData, setDonationData] = useState<IftarNiyah[]>([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     fullname: '',
//     email: '',
//     phone: '',
//     forHowManyDays: '',
//     niyah_detail: '',
//     amount: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(false);

//   // Function to handle form field changes
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Function to submit the form and add new donation
//   const handleSubmit = async () => {
//     if (!formData.fullname || !formData.phone) {
//       alert('Full Name and Phone are required fields.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const payload = { ...formData, addNiyah: 'true' };

//       const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const result = await response.json();
//       alert(result.message);

//       if (result.success) {
//         setFormData({
//           fullname: '',
//           email: '',
//           phone: '',
//           forHowManyDays: '',
//           niyah_detail: '',
//           amount: '',
//         });
//         fetchData(); // Refetch data after successful submission
//         setIsDialogOpen(false); // Close the dialog
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('Unable to submit Iftar Niyah! Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to fetch donation data from the server
//   const fetchData = async () => {
//     setFetching(true);

//     try {
//       const response = await fetch(API_URL, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch donation records');
//       }

//       const result = await response.json();

//       if (Array.isArray(result)) {
//         setDonationData(result); // Set the fetched data to state
//       } else {
//         console.error('Unexpected response format:', result);
//         setDonationData([]); // Clear data if response is invalid
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       alert('Failed to load donation records.');
//     } finally {
//       setFetching(false);
//     }
//   };

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className='p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto'>
//       <h2 className='text-2xl font-bold text-gray-800 mb-6'>Iftar Niyah Donation Records</h2>

//       {/* Add New Donation Button */}
//       <Button onClick={() => setIsDialogOpen(true)} className='mb-6'>
//         Add New Donation
//       </Button>

//       {/* Donation Records Table */}
//       <h3 className='text-xl font-bold text-gray-700 mt-8'>Donation Records</h3>
//       {fetching ? (
//         <p className='text-center mt-4'>Loading records...</p>
//       ) : (
//         <table className='w-full border-collapse border border-gray-300 mt-4'>
//           <thead>
//             <tr className='bg-gray-100'>
//               <th className='border p-2'>ID</th>
//               <th className='border p-2'>Full Name</th>
//               <th className='border p-2'>Email</th>
//               <th className='border p-2'>Phone</th>
//               <th className='border p-2'>Days</th>
//               <th className='border p-2'>Detail</th>
//               <th className='border p-2'>Amount</th>
//               <th className='border p-2'>Recorded At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {donationData.length > 0 ? (
//               donationData.map((item) => (
//                 <tr key={item.id}>
//                   <td className='border p-2'>{item.id}</td>
//                   <td className='border p-2'>{item.fullname}</td>
//                   <td className='border p-2'>{item.email}</td>
//                   <td className='border p-2'>{item.phone}</td>
//                   <td className='border p-2'>{item.forHowManyDays}</td>
//                   <td className='border p-2'>{item.niyah_detail}</td>
//                   <td className='border p-2'>{item.amount}</td>
//                   <td className='border p-2'>
//                     {new Date(item.recorded_at).toLocaleString()}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={8} className='text-center p-4'>
//                   No records found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}

//       {/* Registration Dialog */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent className='bg-white'>
//           <DialogHeader>
//             <DialogTitle>Add New Donation</DialogTitle>
//           </DialogHeader>
//           <div className='space-y-4'>
//             {/* Full Name */}
//             <div>
//               <Label>Full Name</Label>
//               <Input
//                 type='text'
//                 name='fullname'
//                 value={formData.fullname}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <Label>Email</Label>
//               <Input
//                 type='email'
//                 name='email'
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Phone */}
//             <div>
//               <Label>Phone</Label>
//               <Input
//                 type='tel'
//                 name='phone'
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* For How Many Days */}
//             <div>
//               <Label>For How Many Days (Optional)</Label>
//               <Input
//                 type='number'
//                 name='forHowManyDays'
//                 value={formData.forHowManyDays}
//                 onChange={handleChange}
//                 min={0}
//               />
//             </div>

//             {/* Niyah Detail */}
//             <div>
//               <Label>Niyah Detail (Optional)</Label>
//               <Textarea
//                 name='niyah_detail'
//                 value={formData.niyah_detail}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Amount */}
//             <div>
//               <Label>Amount (Optional)</Label>
//               <Input
//                 type='number'
//                 name='amount'
//                 value={formData.amount}
//                 onChange={handleChange}
//                 min={0}
//               />
//             </div>

//             {/* Submit Button */}
//             <DialogFooter>
//               <Button type='button' onClick={handleSubmit} disabled={loading}>
//                 {loading ? 'Submitting...' : 'Submit'}
//               </Button>
//             </DialogFooter>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default IftarNiyahRecords;



'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

const API_URL = 'https://alhudaic.ca/api/Iftar_niyah.php'; // Replace with your actual backend URL

interface IftarNiyah {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  forHowManyDays: number;
  niyah_detail: string;
  amount: number;
  recorded_at: string;
}

const IftarNiyahRecords: React.FC = () => {
  const [donationData, setDonationData] = useState<IftarNiyah[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    forHowManyDays: '',
    niyah_detail: '',
    amount: '',
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // Function to handle form field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to submit the form and add new donation
  const handleSubmit = async () => {
    if (!formData.fullname || !formData.phone) {
      alert('Full Name and Phone are required fields.');
      return;
    }

    setLoading(true);

    try {
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
        fetchData(); // Refetch data after successful submission
        setIsDialogOpen(false); // Close the dialog
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Unable to submit Iftar Niyah! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch donation data from the server
  const fetchData = async () => {
    setFetching(true);

    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch donation records');
      }

      const result = await response.json();

      if (Array.isArray(result)) {
        setDonationData(result); // Set the fetched data to state
      } else {
        console.error('Unexpected response format:', result);
        setDonationData([]); // Clear data if response is invalid
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load donation records.');
    } finally {
      setFetching(false);
    }
  };

  // Function to delete a donation record
  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;

    try {
      const response = await fetch(`${API_URL}?action=delete&id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete record');
      }

      const result = await response.json();
      alert(result.message);

      if (result.success) {
        fetchData(); // Refetch data after deletion
      }
    } catch (error) {
      console.error('Error deleting record:', error);
      alert('Failed to delete record.');
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>Iftar Niyah Donation Records</h2>

      {/* Add New Donation Button */}
      <Button onClick={() => setIsDialogOpen(true)} className='mb-6'>
        Add New Donation
      </Button>

      {/* Donation Records Table */}
      <h3 className='text-xl font-bold text-gray-700 mt-8'>Donation Records</h3>
      {fetching ? (
        <p className='text-center mt-4'>Loading records...</p>
      ) : (
        <table className='w-full border-collapse border border-gray-300 mt-4'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border p-2'>ID</th>
              <th className='border p-2'>Full Name</th>
              <th className='border p-2'>Email</th>
              <th className='border p-2'>Phone</th>
              <th className='border p-2'>Days</th>
              <th className='border p-2'>Detail</th>
              <th className='border p-2'>Amount</th>
              <th className='border p-2'>Recorded At</th>
              <th className='border p-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donationData.length > 0 ? (
              donationData.map((item) => (
                <tr key={item.id}>
                  <td className='border p-2'>{item.id}</td>
                  <td className='border p-2'>{item.fullname}</td>
                  <td className='border p-2'>{item.email}</td>
                  <td className='border p-2'>{item.phone}</td>
                  <td className='border p-2'>{item.forHowManyDays}</td>
                  <td className='border p-2'>{item.niyah_detail}</td>
                  <td className='border p-2'>{item.amount}</td>
                  <td className='border p-2'>
                    {new Date(item.recorded_at).toLocaleString()}
                  </td>
                  <td className='border p-2'>
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className='text-center p-4'>
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Registration Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='bg-white'>
          <DialogHeader>
            <DialogTitle>Add New Donation</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
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
            <DialogFooter>
              <Button type='button' onClick={handleSubmit} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IftarNiyahRecords;