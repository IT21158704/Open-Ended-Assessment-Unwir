import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  Typography,
  CardBody,
} from "@material-tailwind/react";


export default function Home() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [mode, setMode] = useState('add');
  const [selectedNoteId, setSelectedNoteId] = useState('');

  const apiUrl = 'https://open-ended-assessment-unwir-backend.onrender.com/note';

  useEffect(() => {
    axios.get(apiUrl)
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddNote = () => {
    axios.post(`${apiUrl}/add`, formData)
      .then(() => {
        axios.get(apiUrl)
          .then((response) => {
            setNotes(response.data);
          })
          .catch((error) => {
            console.error(error);
          });

        setFormData({
          title: '',
          content: '',
        });
        setMode('add');
      })

      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateNote = () => {
    axios.put(`${apiUrl}/update/${selectedNoteId}`, formData)
      .then(() => {
        axios.get(apiUrl)
          .then((response) => {
            setNotes(response.data);
          })
          .catch((error) => {
            console.error(error);
          });

        setFormData({
          title: '',
          content: '',
        });
        setMode('add');
        setSelectedNoteId('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditNote = (student) => {
    setFormData({
      title: student.title,
      content: student.content,
    });
    setMode('update');
    setSelectedNoteId(student._id);
  };

  const handleCancelEdit = () => {
    setFormData({
      title: '',
      content: '',
    });
    setMode('add');
    setSelectedNoteId('');
  };

  const handleDeleteNote = (id) => {
    axios.delete(`${apiUrl}/delete/${id}`)
      .then(() => {
        axios.get(apiUrl)
          .then((response) => {
            setNotes(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mx-auto bg-gray-50">
      {mode === 'update' ? (
        <div>
          <h1 className="text-3xl font-thin mt-5 text-center">Update Note</h1>
        </div>
      ) : (
        <h1 className="text-3xl font-thin mt-5 text-center">Publish Note</h1>
      )}

      <div className="mb-2">
        <form className="space-y-2 md:w-1/3 w-full mx-auto py-5 text-center">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
            className="rounded-md border border-gray-300 px-3 py-2 w-full"
          />
          <textarea
            name="content"
            placeholder="Content"
            value={formData.content}
            rows={3}
            onChange={handleInputChange}
            className="rounded-md border border-gray-300 px-3 py-2 w-full resize-none"
          />
          {mode === 'update' ? (
            <div className="flex">
              <button onClick={handleUpdateNote} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 w-full">Update</button>
              <button onClick={handleCancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded-md w-full">Cancel</button>
            </div>
          ) : (
            <button onClick={handleAddNote} className="bg-green-500 text-white px-4 py-2 rounded-md w-full">Add</button>
          )}
        </form>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <h1 className="text-3xl font-thin text-center mb-5">Notes</h1>
      <div className="flex justify-center">
        <Card className="max-w-fit md:w-2/3">
          <CardBody className="px-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr className='bg-blue-200'>
                  <th className="border-y border-blue-gray-100 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">No</Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Title</Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Content</Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Date</Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70"></Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {notes.map((notes, index) => {
                  const isLast = index === notes.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-gray-200";
                  return (
                    <tr key={index} className='hover:bg-blue-50'>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography variant="small" color="blue-gray" className="font-bold">{index + 1}</Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">{notes.title}</Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">{notes.content}</Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">{new Date(notes.createdAt).toLocaleDateString()}</Typography>
                      </td>
                      <td className={classes}>
                          <button onClick={() => handleEditNote(notes)} className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2">Edit</button>
                          <button onClick={() => handleDeleteNote(notes._id)} className="bg-red-500 text-white px-3 py-1 rounded-md">Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
