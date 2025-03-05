"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Updated Select imports
import { Textarea } from "@/components/ui/textarea";

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
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
    setError("");
    setSuccessMessage("");

    try {
      const payload = { ...formData, add_member: "true" }; // Add 'add_member' field

      const response = await fetch(
        "https://alhudaic.ca/api/membersRegistration.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setSuccessMessage(result.message);
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
      } else {
        setError(`Error: ${result.message}`);
        if (result.details) {
          console.error("Backend Details:", result.details);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Unable to Register! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Al-Huda Islamic Center Registration Form
      </h2>

      {/* Success Message */}
      {successMessage && (
        <p className="text-green-500 mb-4">{successMessage}</p>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Year of Birth</Label>
            <Input
              type="number"
              name="year_of_birth"
              value={formData.year_of_birth}
              onChange={handleChange}
              required
              min={1900}
              max={new Date().getFullYear()}
            />
          </div>
        </div>

        {/* Address Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Phone</Label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <Label>Sex</Label>
          <Select
            onValueChange={(value) => handleSelectChange("sex", value)}
            value={formData.sex}
            required
          >
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
            <Input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Street Address</Label>
            <Input
              type="text"
              name="street_address"
              value={formData.street_address}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>State</Label>
            <Input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Postal Code</Label>
            <Input
              type="text"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Family Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Marital Status</Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange("marital_status", value)
              }
              value={formData.marital_status}
              required
            >
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
          <Select
            onValueChange={(value) =>
              handleSelectChange("donation_niyah", value)
            }
            value={formData.donation_niyah}
            required
          >
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
            <Textarea
              name="donation_niyah_other"
              value={formData.donation_niyah_other}
              onChange={handleChange}
            />
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
