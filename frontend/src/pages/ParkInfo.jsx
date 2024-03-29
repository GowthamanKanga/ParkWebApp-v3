import React from "react";
import centreIslandPier from "../images/toronto.jpg";

const mockData = {
  banner: {
    imageUrl: centreIslandPier,
    title: "Toronto Island Park",
  },
  aboutUs: {
    title: "About Us",
    description: `The Toronto Islands provide a great, refreshing escape from
      downtown with a beautiful view of Lake Ontario on one side, and
      the city skyline on the other. The park offers a range of
      activities, including biking, picnicking, and beach-going. It's
      the perfect place to relax and enjoy the sunshine on a hot
      summer day, or take in the stunning views of the city and lake
      in the evening. Whether you're a local or just visiting, Toronto
      Island Park is definitely worth checking out.`,
  },
  eventsPrograms: {
    title: "Events & Programs",
    description: `The Toronto Islands host a variety of events and programs
      throughout the year, including festivals, concerts, and outdoor
      movies. There are also nature programs and walks available,
      allowing visitors to learn more about the island's diverse
      ecosystem. If you're looking for something to do, be sure to
      check out the calendar of events on the park's website for more
      information.`,
  },
  parkInformation: {
    items: [
      "First/Lost Children/Lost Parent",
      "Station Lost and Found",
      "Centre Island",
      "Near the ferry dock",
      "May to September",
    ],
    operatingHours: {
      title: "Operating Hours",
      hours: [
        { day: "Monday", time: "10:30 am to 5:30 pm" },
        { day: "Tuesday", time: "10:30 am to 5:30 pm" },
        { day: "Wednesday", time: "10:30 am to 5:30 pm" },
        { day: "Thursday", time: "10:30 am to 5:30 pm" },
        { day: "Friday", time: "10:30 am to 5:30 pm" },
        { day: "Saturday", time: "10:30 am to 5:30 pm" },
        { day: "Sunday", time: "10:30 am to 5:30 pm" },
      ],
    },
    accessibilityNote: "Some wheelchairs are available to use.",
  },
};


const Main = () => {
  return (
    <>
      <body className="bg-white">
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
            href="/ParkInfo"
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
            href="/FacilityList"
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
            href="/BookingPage"
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
            href="/EventList"
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
            href="/ChatForum"
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
            <span>Chat Forum</span>
          </a>
          <a
            rel="noopener noreferrer"
            href="/ParkMap"
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
      </body>
      <div
        className="bg-cover bg-center h-64 w-full"
        style={{ backgroundImage: `url(${mockData.banner.imageUrl})` }}
      >
        <div className="container mx-auto h-full flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold leading-tight">
            {mockData.banner.title}
          </h1>
        </div>
      </div>
      <div className="container mx-auto p-10">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 p-10">
            <div className="bg-white p-10 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-5">
                {mockData.aboutUs.title}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                {mockData.aboutUs.description}
              </p>
              <h3 className="text-xl font-bold mb-5 mt-10">
                {mockData.eventsPrograms.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                {mockData.eventsPrograms.description}
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-5">
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-3">
                {mockData.parkInformation.title}
              </h2>
              {mockData.parkInformation.items.map((item, index) => (
                <p className="text-gray-600 text-md mb-2" key={index}>
                  {item}
                </p>
              ))}
              <h3 className="text-lg font-bold mb-2">
                {mockData.parkInformation.operatingHours.title}
              </h3>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2">Day</th>
                    <th className="text-left p-2">Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.parkInformation.operatingHours.hours.map(
                    (hour, index) => (
                      <tr key={index}>
                        <td className="text-left p-2">{hour.day}</td>
                        <td className="text-left p-2">{hour.time}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
              <p className="text-gray-600 text-md mb-5 mt-3">
                {mockData.parkInformation.accessibilityNote}
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
export default Main;
