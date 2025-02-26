"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Define the structure of a slide item
interface Slide {
  id: number;
  file_url: string;
  file_type: string;
  size: string;
  uploaded_at: string;
}

const SliderPage = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch slides data
  const fetchSlides = async () => {
    try {
      const response = await fetch("http://alhudaic.ca/api/slide.php?getslider=1");
      if (!response.ok) throw new Error("Failed to fetch slides");

      const data = await response.json();
      setSlides(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching slides:", error);
      setSlides([]);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Show preview
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await fetch("http://alhudaic.ca/api/slide.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Slide uploaded successfully!");
        setIsDialogOpen(false);
        fetchSlides(); // Refresh table
      } else {
        alert("Upload failed: " + result.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  // Handle slide deletion
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;

    try {
      const response = await fetch(`http://alhudaic.ca/api/deleteSlide.php?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Slide deleted successfully!");
        fetchSlides();
      } else {
        alert("Failed to delete slide.");
      }
    } catch (error) {
      console.error("Error deleting slide:", error);
      alert("Deletion failed.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Slider Management</h1>

      {/* Add New Button */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-6 bg-green-600 hover:bg-green-700 text-white shadow-md">
            Add New
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white rounded-lg shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">Upload New Slide</DialogTitle>
          </DialogHeader>

          {/* Title */}
          <div className="space-y-2">
            <Label className="block text-sm font-medium text-gray-700">Title</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div className="space-y-2 mt-4">
            <Label className="block text-sm font-medium text-gray-700">Description</Label>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2 mt-4">
            <Label className="block text-sm font-medium text-gray-700">Upload Image/Video</Label>
            <Input
              type="file"
              onChange={handleFileChange}
              className="w-full border-gray-300 rounded-md shadow-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Preview Section */}
          {preview && (
            <div className="mt-4">
              {selectedFile?.type.startsWith("image/") ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-md shadow-md"
                />
              ) : (
                <video
                  src={preview}
                  controls
                  className="w-full h-48 rounded-md shadow-md"
                />
              )}
            </div>
          )}

          {/* Upload Button */}
          <Button
            onClick={handleUpload}
            disabled={loading}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md"
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Slider Table */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">ID</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">File URL</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Type</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Size</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Uploaded At</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slides.length > 0 ? (
              slides.map((slide) => (
                <tr key={slide.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-700 border-b">{slide.id}</td>
                  <td className="py-3 px-4 text-sm text-blue-600 hover:text-blue-700 border-b">
                    <a
                      href={slide.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      View File
                    </a>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 border-b">{slide.file_type}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 border-b">{slide.size}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 border-b">{slide.uploaded_at}</td>
                  <td className="py-3 px-4 text-sm border-b">
                    <Button
                      onClick={() => handleDelete(slide.id)}
                      className="bg-red-600 hover:bg-red-700 text-white shadow-md"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-500">
                  No slides found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SliderPage;