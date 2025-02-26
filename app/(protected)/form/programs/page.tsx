'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle
} from '@/components/ui/dialog'

const API_URL = 'https://alhudaic.ca/api/programs.php'

type Program = {
  id: number
  file_url: string
  file_type: string
  size: string
  uploaded_at: string
  title_paragraph: string
  content: string
}

const ProgramsPage: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(false)
  const [newProgram, setNewProgram] = useState({
    title_paragraph: '',
    content: '',
    file: null as File | null
  })

  // Fetch programs
  const fetchPrograms = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}?programs=1`)
      const data = await response.json()
      setPrograms(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching programs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrograms()
  }, [])

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setNewProgram(prev => ({ ...prev, file }))
  }

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProgram(prev => ({ ...prev, [name]: value }))
  }

  // Submit new program
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append('title_paragraph', newProgram.title_paragraph)
    formData.append('content', newProgram.content)
    if (newProgram.file) {
      formData.append('programMultimedia', newProgram.file)
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData
      })

      const result = await response.json()
      alert(result.message)

      fetchPrograms()
    } catch (error) {
      console.error('Error uploading program:', error)
      alert('Upload failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this program?')) return

    setLoading(true)
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ delete: id.toString() }).toString()
      })

      if (!response.ok) {
        throw new Error('Failed to delete program')
      }

      fetchPrograms()
    } catch (error) {
      console.error('Error deleting program:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-6 bg-white rounded-lg shadow-lg'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold text-gray-700'>Programs</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className='bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700'>
              Add Program
            </Button>
          </DialogTrigger>
          <DialogContent className='p-6 bg-white rounded-lg shadow-lg w-96'>
            <DialogTitle className='text-lg font-semibold mb-4'>
              Add New Program
            </DialogTitle>
            <form onSubmit={handleSubmit}>
              <Label className='block mb-2 text-gray-600'>Title</Label>
              <Input
                type='text'
                name='title_paragraph'
                value={newProgram.title_paragraph}
                onChange={handleChange}
                required
                className='mb-4 w-full'
              />

              <Label className='block mb-2 text-gray-600'>Content</Label>
              <Textarea
                name='content'
                value={newProgram.content}
                onChange={handleChange}
                required
                className='mb-4 w-full'
              />

              <Label className='block mb-2 text-gray-600'>Upload File</Label>
              <Input
                type='file'
                accept='image/*,video/*'
                onChange={handleFileChange}
                className='mb-4 w-full'
              />

              <Button
                type='submit'
                className='w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700'
              >
                {loading ? 'Uploading...' : 'Submit'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Programs Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>File</TableHead>
            <TableHead>Uploaded At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {programs.map(program => (
            <TableRow key={program.id}>
              <TableCell>{program.title_paragraph || 'N/A'}</TableCell>
              <TableCell>{program.content || 'N/A'}</TableCell>
              <TableCell>
                {program.file_url ? (
                  program.file_type.includes('image') ? (
                    <img
                      src={program.file_url}
                      alt='Program'
                      className='w-16 h-16 object-cover rounded'
                    />
                  ) : (
                    <a
                      href={program.file_url}
                      target='_blank'
                      className='text-blue-500 underline'
                    >
                      View File
                    </a>
                  )
                ) : (
                  'No File'
                )}
              </TableCell>
              <TableCell>{program.uploaded_at || 'N/A'}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleDelete(program.id)}
                  className='bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700'
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ProgramsPage
