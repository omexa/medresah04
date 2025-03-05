"use client";
import { useEffect, useState } from "react";

// Define the shape of the member data
interface Member {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  city: string;
  // Add other fields as needed
}

const MembersPage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch members data from the backend
  const fetchMembers = async () => {
    try {
      const response = await fetch("https://alhudaic.ca/api/members.php", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "omit", // Ensure no cookies or credentials are sent
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        setMembers(result.data as Member[]);
      } else {
        setError(result.message || "Failed to fetch members.");
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      setError("Unable to fetch members. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a member by ID
  const deleteMember = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this member?"
      );
      if (!confirmDelete) return;
      const response = await fetch("https://alhudaic.ca/api/members.php", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "omit",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setMembers((prevMembers) =>
          prevMembers.filter((member) => member.id !== id)
        );
      } else {
        alert(result.message || "Failed to delete member.");
      }
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("Unable to delete member. Please try again.");
    }
  };

  // Fetch data on component mount and every 10 seconds for real-time updates
  useEffect(() => {
    fetchMembers();

    const interval = setInterval(fetchMembers, 10000); // Update every 10 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Members List</h2>

      {/* Loading State */}
      {loading && <p className="text-gray-500">Loading members...</p>}

      {/* Error State */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Members Table */}
      {!loading && !error && (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {member.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {member.fullname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {member.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {member.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {member.city}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => deleteMember(member.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MembersPage;
