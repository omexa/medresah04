"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import api from "@/lib/api";

// Define the type for your API response data
type Activity = {
  id: string;
  type: string;
  icon: string | null;
  title: string | null;
  content: string | null;
  link: string;
  image: string;
  uploaded_at: string;
};

const ActivitiesPage: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: "",
    icon: "",
    content: "",
    link: "",
    file: null as File | null,
  });
  const [preview, setPreview] = useState<string | null>(null);

  // Fetch activities from API
  const fetchActivities = async () => {
    setLoading(true);
    try {
      const response = await api.get<Activity[]>("/activities.php?activity=2");
      console.log("Fetched Activities:", response);
      setActivities(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching activities:", error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchActivities();
  }, []);

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewActivity((prev) => ({ ...prev, file }));
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewActivity((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new activity
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("icon", newActivity.icon || "");
    formData.append("title", newActivity.title || "");
    formData.append("content", newActivity.content || "");
    formData.append("link", newActivity.link || "#");
    if (newActivity.file) {
      formData.append("activityImage", newActivity.file);
    }

    try {
      const response = await fetch("https://alhudaic.ca/api/activities.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      alert(result.message);

      // Refresh data after submission
      fetchActivities();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error uploading activity:", error);
      alert("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };
  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this activity?")) return;

    setLoading(true);
    try {
      const response = await fetch("https://alhudaic.ca/api/activities.php", {
        method: "POST",
        body: new URLSearchParams({
          delete: String(Number(id)), // Convert ID to a string after ensuring it's a number
        }).toString(),
      });

      const result = await response.json();
      if (result.success) {
        alert("Activity deleted successfully!");
        fetchActivities(); // Refresh the activities after deletion
      } else {
        alert("Failed to delete activity. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
      alert("Failed to delete activity. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 h-full overflow-hidden ">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Activities Management
      </h2>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-6 bg-green-600 hover:bg-green-700 text-white shadow-md">
            Add Activity
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white rounded-lg shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Upload Activity
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <Label className="block mb-2 text-gray-600">Title</Label>
            <Input
              type="text"
              name="title"
              value={newActivity.title}
              onChange={handleChange}
              required
              className="mb-4 w-full border-gray-300"
            />

            <Label className="block mb-2 text-gray-600">Icon</Label>
            <Input
              type="text"
              name="icon"
              value={newActivity.icon}
              onChange={handleChange}
              className="mb-4 w-full border-gray-300"
            />

            <Label className="block mb-2 text-gray-600">Content</Label>
            <Textarea
              name="content"
              value={newActivity.content}
              onChange={handleChange}
              required
              className="mb-4 w-full border-gray-300"
            />

            <Label className="block mb-2 text-gray-600">Link</Label>
            <Input
              type="text"
              name="link"
              value={newActivity.link}
              onChange={handleChange}
              className="mb-4 w-full border-gray-300"
            />

            <Label className="block mb-2 text-gray-600">
              Upload Image/Video
            </Label>
            <Input
              type="file"
              accept="image/*, video/*"
              onChange={handleFileChange}
              className="mb-4 w-full border-gray-300"
            />

            {preview && (
              <div className="mt-4">
                {newActivity.file?.type.startsWith("image/") ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-md shadow"
                  />
                ) : (
                  <video
                    src={preview}
                    controls
                    className="w-full h-40 rounded-md shadow"
                  ></video>
                )}
              </div>
            )}

            <Button
              type="submit"
              className="mt-4 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
            >
              {loading ? "Uploading..." : "Submit"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <div className="inline-block min-w-full align-middle">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Link</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Uploaded At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <TableRow key={activity.id} className="hover:bg-gray-50">
                    <TableCell>{activity.id}</TableCell>
                    <TableCell>{activity.title || "N/A"}</TableCell>
                    <TableCell>{activity.type}</TableCell>
                    <TableCell>{activity.content || "N/A"}</TableCell>
                    <TableCell>
                      <a
                        href={activity.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {activity.link}
                      </a>
                    </TableCell>
                    <TableCell>
                      {activity.image?.match(/\.(mp4|webm|ogg)$/i) ? (
                        <video
                          src={`https://alhudaic.ca/api/${activity.image}`}
                          controls
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <img
                          src={`https://alhudaic.ca/api/${activity.image}`}
                          alt="Activity"
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                    </TableCell>

                    <TableCell>{activity.uploaded_at}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDelete(activity.id)}
                        className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="py-4 text-center text-gray-500"
                  >
                    No activities found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesPage;
