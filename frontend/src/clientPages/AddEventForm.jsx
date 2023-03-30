import React, { useState } from "react";
import { parse } from "date-fns";

const AddEventForm = ({ onEventSubmit }) => {
  const [eventData, setEventData] = useState({
    name: "",
    month: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    description: "",
    image: "",
    totalTickets: "",
    ticketsLeft: "",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setEventData({ ...eventData, image: imageFile });

    // Create a URL object for the selected image file
    const imageUrl = URL.createObjectURL(imageFile);

    // Update the image preview
    const previewImage = document.getElementById("image-preview");
    previewImage.src = imageUrl;
  };

  const validateInput = () => {
    // Check if any input field is empty
    for (const key in eventData) {
      if (eventData[key] === "") {
        return false;
      }
    }

    // Validate time
    const timeFormat = "HH:mm";
    const parsedStartTime = parse(eventData.startTime, timeFormat, new Date());
    const parsedEndTime = parse(eventData.endTime, timeFormat, new Date());

    if (isNaN(parsedStartTime) || isNaN(parsedEndTime)) {
      return false;
    }

    if (parsedStartTime >= parsedEndTime) {
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInput()) {
      onEventSubmit(eventData);
      setEventData({
        name: "",
        month: "",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        description: "",
        image: "",
      });
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5">
      <h2 className="text-xl font-bold mb-4">Add Event</h2>
      <label className="mb-3 block text-base font-medium text-gray-800">
        Month
        <select
          name="month"
          value={eventData.month}
          onChange={handleChange}
          className="form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
        >
          <option value="">Select a month</option>
          <option value="Jan">Jan</option>
          <option value="Feb">Feb</option>
          <option value="Mar">Mar</option>
          <option value="Apr">Apr</option>
          <option value="May">May</option>
          <option value="Jun">Jun</option>
          <option value="Jul">Jul</option>
          <option value="Aug">Aug</option>
          <option value="Sep">Sep</option>
          <option value="Oct">Oct</option>
          <option value="Nov">Nov</option>
          <option value="Dec">Dec</option>
        </select>
      </label>

      <label className="mb-3 block text-base font-medium text-gray-800">
        Date
        <input
          type="number"
          min="1"
          max="31"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          className="form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
        />
      </label>
      <label className="mb-3 block text-base font-medium text-gray-800">
        Name
        <input
          type="text"
          name="name"
          value={eventData.name}
          onChange={handleChange}
          className="form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
        />
      </label>
      <label className="mb-3 block text-base font-medium text-gray-800">
        Start Time
        <input
          type="time"
          name="startTime"
          value={eventData.startTime}
          onChange={handleChange}
          className="form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
        />
      </label>
      <label className="mb-3 block text-base font-medium text-gray-800">
        End Time
        <input
          type="time"
          name="endTime"
          value={eventData.endTime}
          onChange={handleChange}
          className="form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
        />
      </label>
      <label className="mb-3 block text-base font-medium text-gray-800">
        Location
        <input
          type="text"
          name="location"
          value={eventData.location}
          onChange={handleChange}
          className="form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
        />
      </label>
      <label className="mb-3 block text-base font-medium text-gray-800">
        Description
        <textarea
          name="description"
          value={eventData.description}
          onChange={handleChange}
          className="form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
          rows="4"
        ></textarea>
      </label>
      <label className="mb-3 block text-base font-medium text-gray-800">
        Total Tickets
        <input
          type="number"
          min="0"
          name="totalTickets"
          value={eventData.totalTickets}
          onChange={handleChange}
          className="form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
        />
      </label>
      <label className="mb-3 block text-base font-medium text-gray-800">
        Tickets Left
        <input
          type="number"
          min="0"
          name="ticketsLeft"
          value={eventData.ticketsLeft}
          onChange={handleChange}
          className="form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
        />
      </label>
      <label className="block mb-2">
  Image
  <input
    type="file"
    name="image"
    onChange={handleImageChange}
    className="w-full px-4 py-2 text-gray-700 bg-white rounded-lg focus:outline-none focus:shadow-outline"
  />
  <img id="image-preview" src="" alt="" />
</label>


      <button
        type="submit"
        className="mt-4 bg-gray-800 text-white py-2 px-6 rounded-md hover:bg-gray-700"
      >
        Add Event
      </button>
    </form>
  );
};

export default AddEventForm;
