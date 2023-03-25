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
  const [activeSection, setActiveSection] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState(centreIslandPier);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const sectionList = [
    "Title",
    "Events & Programs",
    "About Us",
    "Info",
    "Hours",
    "Background Image",
  ];

  const handleNextSection = () => {
    if (activeSection < sectionList.length - 1) {
      setActiveSection(activeSection + 1);
    }
  };

  const handlePreviousSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

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
      <nav className="fixed top-0 left-0 z-20 w-full border-b border-gray-200 bg-white py-2.5 px-6 sm:px-4">
        <div className="container mx-auto flex max-w-6xl flex-wrap items-center justify-between">
          <a href="/Home" className="flex items-center">
            <span className="self-center whitespace-nowrap text-xl font-semibold">
              GBC Park & Recreation
            </span>
          </a>
          <div className="mt-2 sm:mt-0 sm:flex md:order-2">
            <button
              type="button"
              className="rounde mr-3 hidden border border-blue-700 py-1.5 px-6 text-center text-sm font-medium text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 md:inline-block rounded-lg"
            >
              Login
            </button>
            <button
              type="button"
              className="rounde mr-3 hidden bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg"
            >
              Register
            </button>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <svg
                className="h-6 w-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
            id="navbar-sticky"
          >
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium">
              <li>
                <a
                  href="/Home"
                  className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-blue-700"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/ParkList"
                  className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                >
                  Park List
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="pt-32  bg-white">
        <h1 className="text-center text-2xl font-bold text-gray-800"></h1>
      </div>

      <div className="flex flex-wrap items-center  overflow-x-auto overflow-y-hidden py-10 justify-center   bg-white text-gray-800">
        <a
          rel="noopener noreferrer"
          href="/EditHome"
          className="flex items-center flex-shrink-0 px-5 py-3 space-x-2text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="w-4 h-4"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>Park Info</span>
        </a>
        <a
          rel="noopener noreferrer"
          href="/EditFacilityList"
          className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 rounded-t-lg text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="w-4 h-4"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          <span>Facilities</span>
        </a>

        <a
          rel="noopener noreferrer"
          href="/ClientEventList"
          className="flex items-center flex-shrink-0 px-5 py-3 space-x-2  text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="w-4 h-4"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
          </svg>
          <a>Event</a>
        </a>
        <a
          rel="noopener noreferrer"
          href="/ClientMap"
          className="flex items-center flex-shrink-0 px-5 py-3 space-x-2  text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="w-4 h-4"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
          </svg>
          <span>Map</span>
        </a>
      </div>
      <div
        className="bg-cover bg-center h-64 w-full"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="container mx-auto h-full flex items-center justify-center">
          <h1 className="text-5xl font-bold leading-tight">{mockData.title}</h1>
        </div>
      </div>

      <div className="container mx-auto p-10">
        <button
          className="bg-gray-900 text-white text-lg font-semibold py-2 px-4 rounded-full ml-4"
          onClick={handleModalOpen}
        >
          Edit
        </button>
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
        title={`Edit Home Page: ${sectionList[activeSection]}`}
      >
        {activeSection === 5 && (
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="background-image"
            >
              Background Image
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              id="background-image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        )}
        {activeSection === 0 && (
          <div className="mb-6">
            {
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
                  value={newTitle}
                  onChange={handleTitleChange}
                />
              </div>
            }
          </div>
        )}
        {activeSection === 1 && (
          <div className="mb-6">
            {
              <div>
                {" "}
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
            }
          </div>
        )}
        {activeSection === 2 && (
          <div className="mb-6">
            {
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
            }
          </div>
        )}
        {activeSection === 3 && (
          <div className="mb-6">
            {
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
                  value={newInfo.join("\n")}
                  onChange={(event) => {
                    setNewInfo(event.target.value.split("\n"));
                  }}
                ></textarea>
              </div>
            }
          </div>
        )}
        {activeSection === 4 && (
          <div className="mb-6">
            {
              <div className="mb-6">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="park-hours"
                >
                  Hours
                </label>
                {newHours.map((item, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      className="w-1/2 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                      type="text"
                      value={item.day}
                      onChange={(event) => {
                        const hours = [...newHours];
                        hours[index].day = event.target.value;
                        setNewHours(hours);
                      }}
                    />
                    <input
                      className="w-1/2 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none ml-2"
                      type="text"
                      value={item.time}
                      onChange={(event) => {
                        const hours = [...newHours];
                        hours[index].time = event.target.value;
                        setNewHours(hours);
                      }}
                    />
                  </div>
                ))}
              </div>
            }
          </div>
        )}

        <div className="mb-6">
          <button
            className="bg-gray-900 text-white text-lg font-semibold py-2 px-4 rounded-full"
            onClick={handlePreviousSection}
            disabled={activeSection === 0}
          >
            Previous
          </button>
          <button
            className="bg-gray-900 text-white text-lg font-semibold py-2 px-4 rounded-full"
            onClick={handleNextSection}
            disabled={activeSection === sectionList.length - 1}
          >
            Next
          </button>
        </div>
      </Modal>
    </>
  );
};

export default EditHome;
