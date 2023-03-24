import React, { useState, useEffect } from 'react';
import { useRef } from 'react';


const EditEventForm = ({ event, onEditEvent, onClose }) => {
    const [editedEvent, setEditedEvent] = useState({ ...event });
  const fileInput = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedEvent({ ...editedEvent, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setEditedEvent({ ...event });
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditEvent(editedEvent);
    onClose();
  };

  return (
    <div className="p-10 bg-white rounded">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="block text-sm text-gray-800">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={editedEvent.name}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full mb-4"
        />

        <label htmlFor="startTime" className="block text-sm text-gray-800">
          Start Time:
        </label>
        <input
          type="text"
          id="startTime"
          name="startTime"
          value={editedEvent.startTime}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full mb-4"
        />

        <label htmlFor="endTime" className="block text-sm text-gray-800">
          End Time:
        </label>
        <input
          type="text"
          id="endTime"
          name="endTime"
          value={editedEvent.endTime}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full mb-4"
        />

        <label htmlFor="location" className="block text-sm text-gray-800">
          Location:
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={editedEvent.location}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full mb-4"
        />

        <label htmlFor="description" className="block text-sm text-gray-800">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={editedEvent.description}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full mb-4 h-32"
        ></textarea>

        <label htmlFor="totalTickets" className="block text-sm text-gray-800">
          Total Tickets:
        </label>
        <input
          type="number"
          id="totalTickets"
          name="totalTickets"
          value={editedEvent.totalTickets}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full mb-4"
        />

        <label htmlFor="ticketsLeft" className="block text-sm text-gray-800">
          Tickets Left:
        </label>
        <input
          type="number"
          id="ticketsLeft"
          name="ticketsLeft"
          value={editedEvent.ticketsLeft}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full mb-4"
        />

<label htmlFor="image" className="block text-sm text-gray-800">
    Image:
  </label>
  <input
    type="file"
    id="image"
    name="image"
    ref={fileInput}
    onChange={handleFileChange}
    className="border rounded px-3 py-2 w-full mb-4"
    accept="image/*"
  />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Save
          </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditEventForm;

