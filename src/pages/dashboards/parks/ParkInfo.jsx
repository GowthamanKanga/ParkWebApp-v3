import React, { useState } from "react";
// import centreIslandPier from "../images/centre-island-pier.png";
// import Park.home from "./HomeParkPark.home";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect } from "react";
const HomePark = () => {
  const { parkId } = useParams();
  console.log(parkId)
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
 

  const [newTitle, setNewTitle] = useState();
  const [newAboutText, setNewAboutText] = useState();
  const [newEventsText, setNewEventsText] = useState();
  const [newInfo, setNewInfo] = useState([]);
  const [newHours, setNewHours] = useState([]);
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
                <a
                  type="button"
                  href="/auth/sign-in"
                  className="rounde mr-3 focus:outline-none hidden border border-blue-700 py-1.5 px-6 text-center text-sm font-medium text-blue-700 focus:outline-none focus:ring-4  md:inline-block rounded-lg"
                >
                  Login
                </a>
                <a
                  type="button"
                  href="/auth/sign-up"
                  className="rounde mr-3 focus:outline-none hidden bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  md:mr-0 md:inline-block rounded-lg"
                >
                  Register
                </a>
               
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

     
      <div className="flex flex-wrap items-center  overflow-x-auto overflow-y-hidden py-10 justify-center   bg-white text-gray-800">
        <a
          rel="noopener noreferrer"
          href={`/parkinfo/${parkId}`}
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
          href={`/facilitylist/${parkId}`}
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
          href={`/bookingpage/${parkId}`}
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
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span>Booking</span>
        </a>
        <a
          rel="noopener noreferrer"
          href={`/eventlist/${parkId}`}
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
          <span>Event</span>
        </a>
       
        <a
          rel="noopener noreferrer"
          href={`/map/${parkId}`}
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
        className="h-64 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${backImgFile})` }}
      >
        <div className="container mx-auto flex h-full items-center justify-center">
          <h1 className="text-5xl font-bold leading-tight">{newTitle}</h1>
        </div>
      </div>

      <div className="container mx-auto p-10">
     
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
              <p className="text-gray-600 text-md mb-5 mt-3">
                Some wheelchairs are available to use .
              </p>
           
      
     
            </div>
          </div>
         
        </div>
       
      </div>
      <footer className="bg-gray-900 p-10 text-white text-center">
        <p>
          &copy; Copyright 2022, All Rights Reserved by George Brown Company
        </p>
        <p>General Information</p>
        <p>Phone:(807)938-6534</p>
        <p>Address:Box 730, 479 Government StreetDryden, ONP8N 2Z4</p>
      </footer>
   
    </>
  );
};

export default HomePark;
