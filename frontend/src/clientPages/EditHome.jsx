import React, { useState } from "react";
import centreIslandPier from "../images/centre-island-pier.png";
import mockData from "./HomeParkMockData";
import Modal from "./EditParkHomeModal";

const EditHome = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(mockData.title);
  const [newAboutText, setNewAboutText] = useState(mockData.about);
  const [newEventsText, setNewEventsText] = useState(mockData.events);
  const [newInfo, setNewInfo] = useState(mockData.info);
  const [newHours, setNewHours] = useState(mockData.hours);

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAboutChange = (event) => {
    setNewAboutText(event.target.value);
  };

  const handleEventsChange = (event) => {
    setNewEventsText(event.target.value);
  };

  const handleInfoChange = (event) => {
    setNewInfo(event.target.value);
  };

  const handleHoursChange = (event) => {
    setNewHours(event.target.value);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSaveChanges = () => {
    mockData.title = newTitle;
    mockData.about = newAboutText;
    mockData.events = newEventsText;
    mockData.info = newInfo;
    mockData.hours = newHours;
    setModalOpen(false);
  };
  return (
    <>
      <div
        className="bg-cover bg-center h-64 w-full"
        style={{ backgroundImage: `url(${centreIslandPier})` }}
      >
        <div className="container mx-auto h-full flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold leading-tight">
            {mockData.title}
          </h1>
          <button
            className="bg-gray-900 text-white text-lg font-semibold py-2 px-4 rounded-full ml-4"
            onClick={handleModalOpen}
          >
            Edit
          </button>
        </div>
      </div>
      <div className="container mx-auto p-10">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 p-10">
            <div className="bg-white p-10 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-5">About Us</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                {mockData.about}
              </p>
              <h3 className="text-xl font-bold mb-5 mt-10">
                Events & Programs
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                {mockData.events}
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-10">
            <div className="bg-white p-10 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-5">Info</h2>
              <ul className="text-gray-600 text-lg leading-relaxed mb-10">
                {mockData.info.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <h3 className="text-xl font-bold mb-5 mt-10">Hours</h3>
              <ul className="text-gray-600 text-lg leading-relaxed">
                {mockData.hours.map((item, index) => (
                  <li key={index}>{`${item.day}: ${item.time}`}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={handleModalClose}
        onSave={handleSaveChanges}
        title="Edit Home Page"
      >
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="park-title"
          >
            Title
          </label>
          <input
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            id="park-title"
            type="text"
            value={mockData.title}
            onChange={(event) => {
              mockData({ ...mockData, title: event.target.value });
            }}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="park-info"
          >
            Info
          </label>
          <textarea
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            id="park-info"
            rows="5"
            value={mockData.info.join("\n")}
            onChange={(event) => {
              mockData({
                ...mockData,
                info: event.target.value.split("\n"),
              });
            }}
          ></textarea>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="park-hours"
          >
            Hours
          </label>
          {mockData.hours.map((item, index) => (
            <div key={index} className="flex mb-2">
              <input
                className="w-1/2 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                type="text"
                value={item.day}
                onChange={(event) => {
                  const hours = [...mockData.hours];
                  hours[index].day = event.target.value;
                  mockData({ ...mockData, hours });
                }}
              />
              <input
                className="w-1/2 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none ml-2"
                type="text"
                value={item.time}
                onChange={(event) => {
                  const hours = [...mockData.hours];
                  hours[index].time = event.target.value;
                  mockData({ ...mockData, hours });
                }}
              />
            </div>
          ))}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="about-textarea"
          >
            About Us
          </label>
          <textarea
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            id="about-textarea"
            rows="5"
            value={newAboutText}
            onChange={handleAboutChange}
          ></textarea>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="events-textarea"
          >
            Events & Programs
          </label>
          <textarea
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            id="events-textarea"
            rows="5"
            value={newEventsText}
            onChange={handleEventsChange}
          ></textarea>
        </div>
      </Modal>
    </>
  );
};

export default EditHome;
