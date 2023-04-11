import React, { useState } from "react";
// import centreIslandPier from "../images/centre-island-pier.png";
// import Park.home from "./HomeParkPark.home";
import Modal from "./EditParkHomeModal";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect } from "react";
import FormData from "form-data";
const userId = localStorage.getItem("userId");
const EditHome = () => {
  const { parkId } = useParams();

  const onChangeFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackImgFile(file);
      };
      reader.readAsDataURL(file);
    }
    console.log(backImgFile);
    setbackgroundImg(e.target.files[0]);
  };
  const [Park, setPark] = useState({});
  const [homeData, setHomeData] = useState({
    title: "",
    about: "",
    events: "",
    info: [],
    hours: [],
    backgroundImg: null,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState();
  const [newAboutText, setNewAboutText] = useState();
  const [newEventsText, setNewEventsText] = useState();
  const [newInfo, setNewInfo] = useState([]);
  const [newHours, setNewHours] = useState([]);
  const [activeSection, setActiveSection] = useState(0);
  const [backgroundImg, setbackgroundImg] = useState(null);
  const [backImgFile, setBackImgFile] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        fetch(`http://localhost:3000/park/${parkId}/home/background`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.blob();
          })
          .then((blob) => {
            const backgroundImg = URL.createObjectURL(blob);
            setbackgroundImg(backgroundImg);
            setBackImgFile(backgroundImg);
            console.log(backgroundImg);
            // Use the image URL here
          })
          .catch((error) => {
            console.error(`An error occurred: ${error}`);
          });
      } catch (err) {
        console.log(err.message);
      }

      try {
        const response = await fetch(
          `http://localhost:3000/park/${parkId}/park`,
          {
            method: "GET",
            mode: "cors",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPark(data);
        setNewTitle(data.home.title);
        setNewAboutText(data.home.about);
        setNewEventsText(data.home.events);
        setNewInfo(data.home.info);
        setNewHours(data.home.hours);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setbackgroundImg(file);
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
  useEffect(() => {
    setHomeData({
      title: newTitle,
      about: newAboutText,
      events: newEventsText,
      info: newInfo,
      hours: newHours,
      backgroundImg: backgroundImg,
    });
  }, [
    newTitle,
    newAboutText,
    newEventsText,
    newInfo,
    newHours,
    activeSection,
    backgroundImg,
  ]);

  const handleSaveChanges = () => {
    const updatedHomeData = {
      title: newTitle,
      about: newAboutText,
      events: newEventsText,
      info: newInfo,
      hours: newHours,
      backgroundImg: backgroundImg,
    };
    setHomeData(updatedHomeData);

    // const formData = new FormData();

    // for (const key in homeData) {
    //   formData.append(key, formData[key]);
    // setModalOpen(false);
    const formData = new FormData();
    formData.append("backgroundImg", backgroundImg);
    formData.append("title", JSON.stringify(newTitle));
    formData.append("about", JSON.stringify(newAboutText));
    formData.append("events", JSON.stringify(newEventsText));
    newInfo.forEach((info) => formData.append("info[]", JSON.stringify(info)));

    newHours.forEach((hours) =>
      formData.append("hours[]", JSON.stringify(hours))
    );

    setModalOpen(false);

    // Make a POST request to the backend API to save the updated home data
    fetch(`http://localhost:3000/park/${parkId}/home`, {
      method: "PUT",

      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((error) => console.error(error));
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
              className="rounde mr-3 hidden rounded-lg border border-blue-700 py-1.5 px-6 text-center text-sm font-medium text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 md:inline-block"
            >
              Login
            </button>
            <button
              type="button"
              className="rounde mr-3 hidden rounded-lg bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block"
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

      <div className="bg-white  pt-32">
        <h1 className="text-center text-2xl font-bold text-gray-800"></h1>
      </div>

      <div className="flex flex-wrap items-center  justify-center overflow-x-auto overflow-y-hidden bg-white   py-10 text-gray-800">
        <a
          rel="noopener noreferrer"
          href={`/Client/EditHome/${parkId}`}
          className="space-x-2text-gray-600 flex flex-shrink-0 items-center px-5 py-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="h-4 w-4"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>Park Info</span>
        </a>
        <a
          rel="noopener noreferrer"
          href={`/Client/EditFacilityList/${parkId}`}
          className="flex flex-shrink-0 items-center space-x-2 rounded-t-lg px-5 py-3 text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="h-4 w-4"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          <span>Facilities</span>
        </a>

        <a
          rel="noopener noreferrer"
          href={`/Client/ClientEventList/${parkId}`}
          className="flex flex-shrink-0 items-center space-x-2 px-5 py-3  text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="h-4 w-4"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
          </svg>
          <a>Event</a>
        </a>
        <a
          rel="noopener noreferrer"
          href={`/Client/ClientMap/${parkId}`}
          className="flex flex-shrink-0 items-center space-x-2 px-5 py-3  text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="h-4 w-4"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
          </svg>
          <span>Map</span>
        </a>
      </div>
      <div
        className="h-64 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${backImgFile})` }}
      >
        <div className="container mx-auto flex h-full items-center justify-center">
          <h1 className="text-5xl font-bold leading-tight">{newTitle}</h1>
        </div>
      </div>

      <div className="container mx-auto p-10">
        <button
          className="ml-4 rounded-full bg-gray-900 py-2 px-4 text-lg font-semibold text-white"
          onClick={handleModalOpen}
        >
          Edit
        </button>
        <div className="flex flex-wrap">
          <div className="w-full p-10 md:w-1/2">
            <div className="rounded-lg bg-white p-10 shadow-lg">
              <h2 className="mb-5 text-3xl font-bold">About Us</h2>
              <p className="mb-10 text-lg leading-relaxed text-gray-600">
                {newAboutText}
              </p>
              <h3 className="mb-5 mt-10 text-xl font-bold">
                Events & Programs
              </h3>
              <p className="mb-10 text-lg leading-relaxed text-gray-600">
                {newEventsText}
              </p>
            </div>
          </div>
          <div className="w-full p-10 md:w-1/2">
            <div className="rounded-lg bg-white p-10 shadow-lg">
              <h2 className="mb-5 text-3xl font-bold">Info</h2>
              <ul className="mb-10 text-lg leading-relaxed text-gray-600">
                {newInfo.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <h3 className="mb-5 mt-10 text-xl font-bold">Hours</h3>
              <ul className="text-lg leading-relaxed text-gray-600">
                {newHours.map((item, index) => (
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
              className="mb-3 block text-base font-medium text-gray-800"
              htmlFor="background-image"
            >
              Background Image
            </label>
            <input
              fileName="backgroundImg"
              className="focus:shadow-outline w-full rounded-lg bg-white px-4 py-2 text-gray-700 focus:outline-none"
              id="background-image"
              type="file"
              accept="image/*"
              onChange={onChangeFile}
            />
          </div>
        )}
        {activeSection === 0 && (
          <div className="mb-6">
            {
              <div className="mb-6">
                <label
                  className="mb-3 block text-base font-medium text-gray-800"
                  htmlFor="park-title"
                >
                  Title
                </label>
                <input
                  className="form-control border-[] w-full rounded-md border bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
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
                  className="mb-3 block text-base font-medium text-gray-800"
                  htmlFor="events-textarea"
                >
                  Events & Programs
                </label>
                <textarea
                  className="form-control border-[] w-full rounded-md border bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
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
                  className="mb-3 block text-base font-medium text-gray-800"
                  htmlFor="about-textarea"
                >
                  About Us
                </label>
                <textarea
                  className="form-control border-[] w-full rounded-md border bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
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
                  className="mb-3 block text-base font-medium text-gray-800"
                  htmlFor="park-info"
                >
                  Info
                </label>
                <textarea
                  className="form-control border-[] w-full rounded-md border bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
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
                  className="mb-3 block text-base font-medium text-gray-800"
                  htmlFor="park-hours"
                >
                  Hours
                </label>
                {newHours.map((item, index) => (
                  <div key={index} className="mb-2 flex">
                    <input
                      className="form-control border-[] w-1/2 rounded-md border bg-white py-3 px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
                      type="text"
                      value={item.day}
                      onChange={(event) => {
                        const hours = [...newHours];
                        hours[index].day = event.target.value;
                        setNewHours(hours);
                      }}
                    />
                    <input
                      className="ml-2 w-1/2 rounded-lg border px-3 py-2 text-gray-700 focus:outline-none"
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

        <div className="mx-auto flex max-w-[200px] justify-between">
          <button
            className="mt-4 rounded-md bg-gray-800 py-2 px-6 text-white hover:bg-gray-700"
            onClick={handlePreviousSection}
            disabled={activeSection === 0}
          >
            Previous
          </button>
          <button
            className="mt-4 rounded-md bg-gray-800 py-2 px-6 text-white hover:bg-gray-700"
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
