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
      <h2 className="text-gray-800 text-3xl font-bold text-center mb-4">Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="mb-3 block text-base font-medium text-gray-800">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={editedEvent.name}
          onChange={handleChange}
          className="form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
        />

        <label htmlFor="startTime" className="mb-3 block text-base font-medium text-gray-800">
          Start Time:
        </label>
        <input
          type="text"
          id="startTime"
          name="startTime"
          value={editedEvent.startTime}
          onChange={handleChange}
          className="form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
        />

        <label htmlFor="endTime" className="mb-3 block text-base font-medium text-gray-800">
          End Time:
        </label>
        <input
          type="text"
          id="endTime"
          name="endTime"
          value={editedEvent.endTime}
          onChange={handleChange}
          className="form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
        />

        <label htmlFor="location" className="mb-3 block text-base font-medium text-gray-800">
          Location:
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={editedEvent.location}
          onChange={handleChange}
          className="form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
        />

        <label htmlFor="description" className="mb-3 block text-base font-medium text-gray-800">
          Description:
        </label>
        <textarea
          rows="5"
          id="description"
          name="description"
          value={editedEvent.description}
          onChange={handleChange}
          className="form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
        ></textarea>

        <label htmlFor="totalTickets" className="mb-3 block text-base font-medium text-gray-800">
          Total Tickets:
        </label>
        <input
          type="number"
          id="totalTickets"
          name="totalTickets"
          value={editedEvent.totalTickets}
          onChange={handleChange}
          className="form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
        />

        <label htmlFor="ticketsLeft" className="mb-3 block text-base font-medium text-gray-800">
          Tickets Left:
        </label>
        <input
          type="number"
          id="ticketsLeft"
          name="ticketsLeft"
          value={editedEvent.ticketsLeft}
          onChange={handleChange}
          className="form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
        />

<label htmlFor="image" className="mb-3 block text-base font-medium text-gray-800">
    Image:
  </label>
  <input
    type="file"
    id="image"
    name="image"
    ref={fileInput}
    onChange={handleFileChange}
    className="form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
    accept="image/*"
  />
        <div class="flex max-w-[200px] mx-auto justify-between">
          <button type="submit" className="mt-4 bg-gray-800 text-white py-2 px-6 rounded-md hover:bg-gray-700">
            Save
            </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 bg-gray-800 text-white py-2 px-6 rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEventForm;

