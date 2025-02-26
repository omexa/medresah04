"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Updated Select imports
import { Textarea } from "@/components/ui/textarea";

const API_URL = "https://alhudaic.ca/api/membersRegistration.php";

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    year_of_birth: "",
    email: "",
    phone: "",
    sex: "",
    city: "",
    street_address: "",
    state: "",
    postal_code: "",
    marital_status: "",
    family_members: "",
    donation_niyah: "",
    donation_niyah_other: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      alert(result.message);

      if (result.success) {
        setFormData({
          fullname: "",
          year_of_birth: "",
          email: "",
          phone: "",
          sex: "",
          city: "",
          street_address: "",
          state: "",
          postal_code: "",
          marital_status: "",
          family_members: "",
          donation_niyah: "",
          donation_niyah_other: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Unable to Register! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 ">Al-Huda Islamic Center Registration Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Full Name</Label>
            <Input type="text" name="fullname" value={formData.fullname} onChange={handleChange} required />
          </div>
          <div>
            <Label>Year of Birth</Label>
            <Input type="number" name="year_of_birth" value={formData.year_of_birth} onChange={handleChange} required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Email</Label>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <Label>Phone</Label>
            <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
        </div>

        <div>
          <Label>Sex</Label>
          <Select onValueChange={(value) => handleSelectChange("sex", value)} value={formData.sex} required>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Address Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>City</Label>
            <Input type="text" name="city" value={formData.city} onChange={handleChange} required />
          </div>
          <div>
            <Label>Street Address</Label>
            <Input type="text" name="street_address" value={formData.street_address} onChange={handleChange} required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>State</Label>
            <Input type="text" name="state" value={formData.state} onChange={handleChange} required />
          </div>
          <div>
            <Label>Postal Code</Label>
            <Input type="text" name="postal_code" value={formData.postal_code} onChange={handleChange} required />
          </div>
        </div>

        {/* Family Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Marital Status</Label>
            <Select onValueChange={(value) => handleSelectChange("marital_status", value)} value={formData.marital_status} required>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Single">Single</SelectItem>
                <SelectItem value="Married">Married</SelectItem>
                <SelectItem value="Divorced">Divorced</SelectItem>
                <SelectItem value="Widowed">Widowed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
  <Label>Family Members</Label>
  <Input
    type="number"
    name="family_members"
    value={formData.family_members}
    onChange={handleChange}
    required
    min={0}
    max={30}
  />
</div>

        </div>

        {/* Donation Information */}
        <div>
          <Label>Donation Niyah</Label>
          <Select onValueChange={(value) => handleSelectChange("donation_niyah", value)} value={formData.donation_niyah} required>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Zakat">Zakat</SelectItem>
              <SelectItem value="Sadaqah">Sadaqah</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.donation_niyah === "Other" && (
          <div>
            <Label>Other Donation Niyah</Label>
            <Textarea name="donation_niyah_other" value={formData.donation_niyah_other} onChange={handleChange} />
          </div>
        )}

        {/* Submit Button */}
        <Button type="submit" disabled={loading} className="w-full mt-6">
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default RegistrationForm;