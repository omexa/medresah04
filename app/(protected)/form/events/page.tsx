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
  description: string;
  additional_description: string;
  image_url: string;
  event_date: string;
}

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [event_date, setEventDate] = useState(""); // Define event_date state

  // Fetch events from API
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await api.get("/events.php?getEvents=2");
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
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Create a FormData object for submitting data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("event_date", event_date); // Use event_date here
    formData.append("description", description);
    formData.append("additional_description", details); // Assuming 'details' maps to 'additional_description'

    if (file) {
      formData.append("eventImage", file); // Use 'file' for event image
    }

    try {
      const response = await fetch("https://alhudaic.ca/api/events.php", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Handle success
        console.log(
          "Event created successfully:",
          data.message || "Event created"
        );
        alert("Event created successfully!");
        setIsDialogOpen(false); // Optionally close the dialog
        fetchEvents(); // Optionally refetch events
      } else {
        // Handle failure (response not OK)
        console.error("Error:", data.error || "An unknown error occurred");
        alert(data.error || "An error occurred");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  // Handle delete action
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    setLoading(true);

    try {
      const response = await fetch("https://alhudaic.ca/api/events.php", {
        method: "DELETE", // Use DELETE method here
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Send the event ID in the request body
      });

      const result = await response.json();

      if (result.status === "success") {
        alert("Event deleted successfully!");
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== id)
        );
      } else {
        alert("Failed to delete event. Try again.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete event. Try again.");
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
          <Button className="mb-6 bg-green-600 hover:bg-green-700 text-white">
            Add Event
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Upload Event</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <Label>Title</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Label>Details</Label>
            <Textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
            <Label>Event Date</Label>
            <Input
              type="date"
              value={event_date}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
            <Label>Upload Image</Label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-40 object-cover mt-4"
              />
            )}
            <Button
              type="submit"
              className="mt-4 w-full bg-blue-600 text-white"
            >
              {loading ? "Uploading..." : "Submit"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-center">
              {" "}
              {/* Centering the header text */}
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Event Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event) => (
                <tr key={event.id} className="text-center">
                  {" "}
                  {/* Centering the row content */}
                  <td className="px-4 py-2">{event.id}</td>
                  <td className="px-4 py-2">{event.title}</td>
                  <td className="px-4 py-2">
                    <img
                      src={`https://alhudaic.ca/api/${event.image_url}`}
                      alt="Event"
                      className="w-16 h-16 mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2">
                    {new Date(event.event_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <Button
                      onClick={() => handleDelete(event.id)}
                      className="bg-red-600 text-white"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center px-4 py-2">
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

export default EventsPage;
