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

const API_URL = 'https://alhudaic.ca/api/mosque_programs.php'

type MosqueProgram = {
  id: number
  title: string
  content: string
  link: string
  file_url?: string
  uploaded_at: string
}

const MosqueProgramsPage: React.FC = () => {
  const [programs, setPrograms] = useState<MosqueProgram[]>([])
  const [loading, setLoading] = useState(false)
  const [newProgram, setNewProgram] = useState({
    title: '',
    content: '',
    link: '',
    file: null as File | null
  })

  // Fetch mosque programs
  const fetchPrograms = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}?activity=1`)
      const data = await response.json()
      setPrograms(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching mosque programs:', error)
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

  // Submit new mosque program
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append('title', newProgram.title)
    formData.append('content', newProgram.content)
    formData.append('link', newProgram.link)
    if (newProgram.file) {
      formData.append('mosque_programsImage', newProgram.file)
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
      console.error('Error uploading mosque program:', error)
      alert('Upload failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this mosque program?')) return

    setLoading(true)
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ delete: id.toString() }).toString()
      })

      if (!response.ok) {
        throw new Error('Failed to delete mosque program')
      }

      fetchPrograms()
    } catch (error) {
      console.error('Error deleting mosque program:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-6 bg-white rounded-lg shadow-lg'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold text-gray-700'>Mosque Programs</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className='bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700'>
              Add Mosque Program
            </Button>
          </DialogTrigger>
          <DialogContent className='p-6 bg-white rounded-lg shadow-lg w-96'>
            <DialogTitle className='text-lg font-semibold mb-4'>
              Add New Mosque Program
            </DialogTitle>
            <form onSubmit={handleSubmit}>
              <Label className='block mb-2 text-gray-600'>Title</Label>
              <Input
                type='text'
                name='title'
                value={newProgram.title}
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

              <Label className='block mb-2 text-gray-600'>Link</Label>
              <Input
                type='text'
                name='link'
                value={newProgram.link}
                onChange={handleChange}
                placeholder='Optional external link'
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

      {/* Mosque Programs Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>File/Link</TableHead>
            <TableHead>Uploaded At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {programs.map(program => (
            <TableRow key={program.id}>
              <TableCell>{program.title || 'N/A'}</TableCell>
              <TableCell>{program.content || 'N/A'}</TableCell>
              <TableCell>
                {program.file_url ? (
                  program.file_url.includes('image') ? (
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
                ) : program.link ? (
                  <a href={program.link} target='_blank' className='text-blue-500 underline'>
                    Visit Link
                  </a>
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

export default MosqueProgramsPage
