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
import api from "@/lib/api";

interface Event {
  id: string;
  title: string;
  content: string;
  detail: string;
  background_url: string;
  uploaded_at: string;
}

const FormComponent: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [detail, setDetail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch events from API
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await api.get("/shortEvent.php?getshortEvent=2");
      if (Array.isArray(response.data)) {
        setEvents(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("detail", detail);
    if (file) formData.append("background", file);
    try {
      const response = await fetch("https://alhudaic.ca/api/shortEvent.php", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log("API Response:", result);
      alert(result.data.message);
      if (result.data.success) {
        setIsDialogOpen(false);
        fetchEvents(); // Refresh event list
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete action
  // Handle delete action
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    setLoading(true);
    try {
      console.log("Deleting event with ID:", id); // Log the ID being sent

      const response = await fetch("https://alhudaic.ca/api/shortEvent.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          delete: id, // Pass the ID as the value of the "delete" parameter
        }).toString(),
      });

      const result = await response.json();
      console.log("Delete Response:", result); // Log the API response

      if (result.success) {
        alert("Event deleted successfully!");

        // Remove the deleted event from the events list
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== id)
        );
      } else if (result.error === "No record found with the provided ID.") {
        alert("Error: No record found with the provided ID.");
        console.error("Record not found for ID:", id);
      } else {
        alert("Failed to delete event. Please try again.");
        console.error("API Error:", result.error || "Unknown error");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Event Management
      </h2>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-6 bg-green-600 hover:bg-green-700 text-white shadow-md">
            Add Event
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white rounded-lg shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Upload Event
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <Label className="block mb-2 text-gray-600">Title</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mb-4 w-full border-gray-300"
            />
            <Label className="block mb-2 text-gray-600">Content</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="mb-4 w-full border-gray-300"
            />
            <Label className="block mb-2 text-gray-600">Details</Label>
            <Textarea
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              required
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
                {file?.type.startsWith("image/") ? (
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

      {/* Events Table */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                ID
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                Title
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                Image
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                Uploaded At
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event) => (
                <tr
                  key={event.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-gray-700 border-b">
                    {event.id}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 border-b">
                    {event.title}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 border-b">
                    <img
                      src={`https://alhudaic.ca/api/${event.background_url}`}
                      alt="Event"
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 border-b">
                    {event.uploaded_at}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 border-b">
                    <Button
                      onClick={() => handleDelete(event.id)}
                      className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormComponent;
