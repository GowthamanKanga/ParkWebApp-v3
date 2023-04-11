import React, { useState } from "react";
import { parse } from "date-fns";

const AddEventForm = ({ onEventSubmit }) => {
  const [eventData, setEventData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    numTickets: "",
    location: "",
    description: "",
    image: null,
    imageFile: null,
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventData({
          ...eventData,
          image: reader.result,
          imageFile: imageFile,
        });
      };
      reader.readAsDataURL(imageFile);
    }

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

    onEventSubmit(eventData);
    setEventData({
      name: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      numTickets: "",
      location: "",
      description: "",
      image: null,
      imageFile: null,
    });
  };

  return (
<form onSubmit={handleSubmit} className="bg-white p-4 z-50">
  <div class="-mx-3 flex flex-wrap">
        <div class="w-full px-3 sm:w-1/2">
          <div class="mb-5">
            <label
              for="fName"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={eventData.name}
              onChange={handleChange}
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
        <div class="w-full px-3 sm:w-1/2">
          <div class="mb-5">
            <label class="mb-3 block text-base font-medium text-[#07074D]">
              Total Tickets
            </label>
            <input
              type="number"
              name="numTickets"
              value={eventData.numTickets}
              onChange={handleChange}
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
      </div>

      <div class="-mx-3 flex flex-wrap">
        <div class="w-full px-3 sm:w-1/2">
          <div class="mb-5">
            <label
              for="date"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={eventData.startDate}
              onChange={handleChange}
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
        <div class="w-full px-3 sm:w-1/2">
          <div class="mb-5">
            <label class="mb-3 block text-base font-medium text-[#07074D]">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={eventData.endDate}
              onChange={handleChange}
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
      </div>

      <div class="-mx-3 flex flex-wrap">
        <div class="w-full px-3 sm:w-1/2">
          <div class="mb-5">
            <label class="mb-3 block text-base font-medium text-[#07074D]">
              Start Time
            </label>
            <input
              type="time"
              name="startTime"
              value={eventData.startTime}
              onChange={handleChange}
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
        <div class="w-full px-3 sm:w-1/2">
          <div class="mb-5">
            <label
              for="time"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              End Time
            </label>
            <input
              type="time"
              name="endTime"
              value={eventData.endTime}
              onChange={handleChange}
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
      </div>
      <div class="mb-5">
        <label
          for="location"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          Location
        </label>
        <input
          type="text"
          name="location"
          value={eventData.location}
          onChange={handleChange}
          class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div class="mb-5">
        <label
          for="description"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          Description
        </label>
        <textarea
          type="text"
          name="description"
          rows={2}
          value={eventData.description}
          onChange={handleChange}
          class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>

      <label className="mb-3 block text-base font-medium text-[#07074D]">
        Image
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
        {/* <img id="image-preview" src="" alt="" /> */}
      </label>
      <div>
        <button class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddEventForm;
