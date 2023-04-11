import React, { useState, useEffect } from "react";
import { useRef } from "react";

const EditEventForm = ({ event, onEditEvent, onClose }) => {
  const [editedEvent, setEditedEvent] = useState({
    ...event,
    startDate:new Date(event.startDate).toLocaleString().substring(0, 10),
   endDate: new Date(event.endDate).toLocaleString().substring(0, 10)
  });

  const fileInput = useRef(null);

  const handleFileChange = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedEvent({
          ...editedEvent,
          image: reader.result,
          imageFile: imageFile,
        });
      };
      reader.readAsDataURL(imageFile);
    }
  };

  useEffect(() => {
    setEditedEvent({
      ...event,
      startDate:new Date(event.startDate).toLocaleString().substring(0, 10),
      endDate:new Date(event.endDate).toLocaleString().substring(0, 10)})
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setEditedEvent({ ...editedEvent, [name]: value });
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditEvent(editedEvent);
    console.log(editedEvent);
    onClose();
  };

  return (
    <div className=" rounded bg-white">
      <h2 className="mb-4 pt-2 text-center text-3xl font-bold text-gray-800">
        Edit Event
      </h2>

      <form onSubmit={handleSubmit} className="bg-white p-4 ">
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
                value={editedEvent.name}
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
                value={editedEvent.numTickets}
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
                value={editedEvent.startDate}
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
                value={editedEvent.endDate}
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
                value={editedEvent.startTime}
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
                value={editedEvent.endTime}
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
            value={editedEvent.location}
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
            value={editedEvent.description}
            onChange={handleChange}
            class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <label className="mb-3 block text-base font-medium text-[#07074D]">
          Image
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
          {/* <img id="image-preview" src="" alt="" /> */}
        </label>
        <div>
          <button
            type="submit"
            class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEventForm;
