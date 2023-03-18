import React, { useState } from "react";
import { format, parse, startOfWeek, getDay } from "date-fns";

const AddEventForm = ({ onEventSubmit }) => {
  const [eventData, setEventData] = useState({
    name: "",
    month: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const validateInput = () => {
    // Check if any input field is empty
    for (const key in eventData) {
      if (eventData[key] === "") {
        return false;
      }
    }

    // Validate date and time
    const dateFormat = "yyyy-MM-dd";
    const timeFormat = "HH:mm";
    const parsedDate = parse(eventData.date, dateFormat, new Date());
    const parsedStartTime = parse(eventData.startTime, timeFormat, new Date());
    const parsedEndTime = parse(eventData.endTime, timeFormat, new Date());

    if (isNaN(parsedDate) || isNaN(parsedStartTime) || isNaN(parsedEndTime)) {
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
      });
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5">
      <h2 className="text-xl font-bold mb-4">Add Event</h2>
      <label className="block mb-2">
        Image
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mt-1"
        />
      </label>
      <label className="block mb-2">
        Month
        <input
          type="text"
          name="month"
          value={eventData.month}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mt-1"
        />
      </label>
      <label className="block mb-2">
        Date
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mt-1"
        />
      </label>
      <label className="block mb-2">
        Name
        <input
          type="text"
          name="name"
          value={eventData.name}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mt-1"
        />
      </label>
      <label className="block mb-2">
        Start Time
        <input
          type="time"
          name="startTime"
          value={eventData.startTime}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mt-1"
        />
      </label>
      <label className="block mb-2">
        End Time
        <input
          type="time"
          name="endTime"
          value={eventData.endTime}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mt-1"
          />
          </label>
          <label className="block mb-2">
          Location
          <input
                 type="text"
                 name="location"
                 value={eventData.location}
                 onChange={handleChange}
                 className="border border-gray-300 p-2 w-full mt-1"
               />
          </label>
          <label className="block mb-2">
          Description
          <textarea
                 name="description"
                 value={eventData.description}
                 onChange={handleChange}
                 className="border border-gray-300 p-2 w-full mt-1"
               ></textarea>
          </label>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
          Submit
          </button>
          </form>
          );
          };
          
          export default AddEventForm;
