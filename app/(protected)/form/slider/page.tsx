"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Slide {
  id: number;
  file_url: string; // Ensure this matches the backend response
  title: string;
  description: string;
}

export default function AdminSlider() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch(
        `https://alhudaic.ca/api/slide.php?getslider=2&_=${Date.now()}`
      );
      if (!response.ok) throw new Error("Failed to fetch slides");

      const data = await response.json();
      console.log("Fetched slides:", data);
      setSlides(data);
    } catch (error) {
      console.error("Error fetching slides:", error);
    }
  };

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
    formData.append("addSlider", "1");

    try {
      const response = await fetch("https://alhudaic.ca/api/slide.php", {
        method: "POST",
        body: formData,
      });

      const textResponse = await response.text(); // Get raw response
      const jsonMatch = textResponse.match(/\{.*\}/); // Extract JSON only

      if (!jsonMatch) {
        console.error("Unexpected API response:", textResponse);
        alert("Unexpected server response. Please check console.");
        return;
      }

      const result = JSON.parse(jsonMatch[0]); // Parse valid JSON

      if (response.ok && result.status === "success") {
        alert("Slide uploaded successfully!");
        setIsDialogOpen(false);
        fetchSlides();
      } else {
        alert("Upload failed: " + result.error);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;

    try {
      const formData = new FormData();
      formData.append("delete", id.toString());

      const response = await fetch("https://alhudaic.ca/api/slide.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Slide deleted successfully!");
        fetchSlides();
      } else {
        alert("Failed to delete slide: " + result.error);
      }
    } catch (error) {
      console.error("Error deleting slide:", error);
      alert("Deletion failed.");
    }
  };

  return (
    <div className="p-6">
      <Button onClick={() => setIsDialogOpen(true)}>Add New Slide</Button>
      <Card className="mt-4">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slides.map((slide) => (
                <TableRow key={slide.id}>
                  <TableCell>
                    {slide.file_url ? (
                      slide.file_url.endsWith(".mp4") ||
                      slide.file_url.endsWith(".webm") ? (
                        <video
                          src={`https://alhudaic.ca/api/${slide.file_url}`}
                          width={50}
                          height={50}
                          controls
                          className="rounded-lg"
                        />
                      ) : (
                        <Image
                          src={`https://alhudaic.ca/api/${slide.file_url}`}
                          width={50}
                          height={50}
                          alt={slide.title || "No Title"}
                          className="rounded-lg"
                          loading="lazy"
                        />
                      )
                    ) : (
                      <span>N/A</span>
                    )}
                  </TableCell>
                  <TableCell>{slide.title}</TableCell>
                  <TableCell>{slide.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(slide.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Add New Slide</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 bg-white">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            <Label>Description</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Label>Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            />
            <Button
              onClick={handleUpload}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
