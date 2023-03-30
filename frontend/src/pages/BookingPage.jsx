import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Calendar, dateFnsLocalizer, Navigate } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Booking 1",
    name: "Dennis",
    facility: "Picnic Pavilion",
    start: new Date(2023, 1, 8, 12, 30),
    end: new Date(2023, 1, 8, 14, 30),
    capacity: 30,
    price: 0,
  },
  {
    title: "Booking 2",
    name: "Gowtham",
    facility: "Petting Zoo",
    start: new Date(2023, 1, 9, 19),
    end: new Date(2023, 1, 9, 21),
    capacity: 25,
    price: 0,
  },
  {
    title: "Booking 3",
    name: "Yaroslav",
    facility: "Hedge Maze",
    start: new Date(2023, 1, 10, 1, 23, 43),
    end: new Date(2023, 1, 10, 3, 23, 43),
    capacity: 20,
    price: 0,
  },
  {
    title: "Booking 4",
    name: "Yagnik",
    facility: "Maze",
    start: new Date(2023, 2, 12, 1, 23, 43),
    end: new Date(2023, 1, 10, 3, 23, 43),
    capacity: 15,
    price: 0,
  },
];

const mockData = [
  {
    name: "Facility 1",
    equipment: [
      { name: "Equipment 1.1" },
      { name: "Equipment 2.1" },
      { name: "Equipment 3.1" },
    ],
  },
  {
    name: "Facility 2",
    equipment: [
      { name: "Equipment 1.2" },
      { name: "Equipment 2.2" },
      { name: "Equipment 3.2" },
    ],
  },
  {
    name: "Facility 3",
    equipment: [
      { name: "Equipment 1.3" },
      { name: "Equipment 2.3" },
      { name: "Equipment 3.3" },
    ],
  },
  {
    name: "Facility 4",
    equipment: [
      { name: "Equipment 1.4" },
      { name: "Equipment 2.4" },
      { name: "Equipment 3.4" },
    ],
  },
];

const Bookings = () => {
  const [bookingNumber, SetBookingNumber] = useState("");
  const [facility, setFacility] = useState("");
  const [user, SetUser] = useState("");
  const [booking_date, SetBookingDate] = useState("");
  const [amount_of_guests, SetAmountOfGuests] = useState("");
  const [start_time, SetStartTime] = useState("");
  const [end_time, SetEndTime] = useState("");
  const [response, setResponse] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [bookingEquipment, setBookingEquipment] = useState(false);
  const [ownEquipment, setOwnEquipment] = useState(false);

  const handleFacilityChange = (e) => {
    setFacility(e.target.value);
    setSelectedEquipment([]);
    setBookingEquipment(false);
    setOwnEquipment(false);
  };

  const handleEquipmentChange = (e) => {
    const equipmentName = e.target.name;
    if (e.target.checked) {
      setSelectedEquipment([...selectedEquipment, equipmentName]);
    } else {
      setSelectedEquipment(
        selectedEquipment.filter((item) => item !== equipmentName)
      );
    }
  };

  const handleBookingEquipmentChange = (e) => {
    setBookingEquipment(e.target.checked);
    setOwnEquipment(!e.target.checked);
  };

  const handleOwnEquipmentChange = (e) => {
    setOwnEquipment(e.target.checked);
    setBookingEquipment(!e.target.checked);
  };

  const validate = () => {
    let newErrors = {};

    if (!user) {
      newErrors.user = "User name is required";
    }

    if (!booking_date) {
      newErrors.booking_date = "Booking date is required";
    }

    if (!amount_of_guests) {
      newErrors.amount_of_guests = "Amount of guests is required";
    } else if (!/^[0-9]+$/.test(amount_of_guests)) {
      newErrors.amount_of_guests = "Amount of guests must be a number";
    }

    if (!start_time) {
      newErrors.start_time = "Start time is required";
    }

    if (!end_time) {
      newErrors.end_time = "End time is required";
    }

    if (!facility) {
      newErrors.facility = "Facility is required";
    }

    return newErrors;
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      const newErrors = validate();
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        try {
          let booking_id = Math.floor(Math.random() * 1000000);
          const response = await fetch("http://localhost:5501/booking/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user,
              facility,
              booking_date,
              amount_of_guests,
              start_time,
              end_time,
              booking_id,
            }),
          });

          if (response.status === 201) {
            setResponse("true");
            setTimeout(() => {
              setResponse("false");
            }, 1500);
          }

          const result = await response.json();
          console.log(result);
        } catch (error) {
          console.error(error);
        } finally {
          setIsSubmitting(false);
        }
      } else {
        setIsSubmitting(false);
      }
    },
    [user, facility, booking_date, amount_of_guests, start_time, end_time]
  );

  const facilityData = mockData.find((data) => data.name === facility);

  const navigate = useNavigate();

  return (
    <div>
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
          href="FacilityList"
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
      {response == "true" && (
        <div className="flex rounded-md bg-green-100 p-3">
          <svg
            className="mr-2 h-8 w-8 flex-shrink-0 stroke-current stroke-2 text-green-600"
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0h24v24H0z" stroke="none" />
            <circle cx="12" cy="12" r="9" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <div className="text-green-700">
            <div className="text-xl font-bold">Your Booking has been saved</div>
          </div>
        </div>
      )}
      <form>
        <body className="bg-white"></body>
        <div>
          <div class="flex py-16 bg-gray-100 justify-center">
            <div class="mx-auto w-full max-w-[450px] shadow-md px-12 py-12 bg-white rounded-2xl">
              <div>
                <h1 class="text-gray-800 text-3xl font-bold text-center mb-4">
                  Book a Facility
                </h1>
              </div>
              <form onSubmit="Submit();">
                <div class="mb-5">
                  <label
                    class="mb-3 block text-base font-medium text-gray-800"
                    for="name "
                  >
                    Username:{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
                    id="user"
                    placeholder="Enter user name"
                    value={user}
                    onChange={(e) => SetUser(e.target.value)}
                  />
                  {errors.user && (
                    <small className="form-text text-danger">
                      {errors.user}
                    </small>
                  )}
                </div>
                <div class="mb-5">
                  <label
                    class="mb-3 block text-base font-medium text-gray-800"
                    for="facility"
                  >
                    Facility:{" "}
                  </label>
                  <select
                    class="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-800 outline-none focus:border-indigo-500 focus:shadow-md"
                    id="facility"
                    value={facility}
                    onChange={handleFacilityChange}
                  >
                    <option value="">Select a facility</option>
                    {mockData.map((data) => (
                      <option key={data.name} value={data.name}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                  {errors.facility && (
                    <small className="form-text text-danger">
                      {errors.facility}
                    </small>
                  )}
                </div>
                <div class="mb-5">
                  <label class="mb-3 block text-base font-medium text-gray-800">
                    Equipment:
                  </label>
                  <div>
                    <input
                      type="checkbox"
                      id="booking_equipment"
                      checked={bookingEquipment}
                      onChange={handleBookingEquipmentChange}
                    />
                    <label for="booking_equipment" class="ml-2">
                      Book equipment from the facility
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="own_equipment"
                      checked={ownEquipment}
                      onChange={handleOwnEquipmentChange}
                    />
                    <label for="own_equipment" class="ml-2">
                      Bring own equipment
                    </label>
                  </div>
                  {bookingEquipment && (
                    <div className="mt-4">
                      {mockData
                        .filter(
                          (facilityOption) => facilityOption.name === facility
                        )
                        .map((filteredFacility) => (
                          <details key={filteredFacility.name}>
                            <summary className="cursor-pointer text-indigo-600">
                              {filteredFacility.name} Equipment
                            </summary>
                            {filteredFacility.equipment.map(
                              (equipment, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-2 mb-2 pl-4"
                                >
                                  <input
                                    type="checkbox"
                                    name={equipment.name}
                                    checked={selectedEquipment.includes(
                                      equipment.name
                                    )}
                                    onChange={handleEquipmentChange}
                                    className="form-checkbox text-indigo-600"
                                  />
                                  <label className="ml-2 text-gray-700">
                                    {equipment.name}
                                  </label>
                                </div>
                              )
                            )}
                          </details>
                        ))}
                    </div>
                  )}
                </div>

                <div class="mb-5">
                  <label
                    class="mb-3 block text-base font-medium text-gray-800"
                    for="date"
                  >
                    Date:{" "}
                  </label>
                  <input
                    type="date"
                    className="form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
                    id="booking_date"
                    value={booking_date}
                    onChange={(e) => SetBookingDate(e.target.value)}
                  />
                  {errors.booking_date && (
                    <small className="form-text text-danger">
                      {errors.booking_date}
                    </small>
                  )}
                </div>
                <div class="mb-5">
                  <label
                    for="guest"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Number of Guest?
                  </label>
                  <input
                    type="text"
                    className="form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
                    id="amount_of_guests"
                    placeholder="Enter amount of guests"
                    value={amount_of_guests}
                    onChange={(e) => SetAmountOfGuests(e.target.value)}
                  />
                  {errors.amount_of_guests && (
                    <small className="form-text text-danger">
                      {errors.amount_of_guests}
                    </small>
                  )}
                </div>
                <div class="mb-5">
                  <label
                    class="mb-3 block text-base font-medium text-gray-800"
                    for="time"
                  >
                    Start Time:{" "}
                  </label>
                  <input
                    type="time"
                    className="form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
                    id="start_time"
                    value={start_time}
                    onChange={(e) => SetStartTime(e.target.value)}
                  />
                  {errors.start_time && (
                    <small className="form-text text-danger">
                      {errors.start_time}
                    </small>
                  )}
                </div>
                <div class="mb-5">
                  <label
                    class="mb-3 block text-base font-medium text-gray-800"
                    for="time"
                  >
                    End Time:{" "}
                  </label>
                  <input
                    type="time"
                    className="form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
                    id="end_time"
                    value={end_time}
                    onChange={(e) => SetEndTime(e.target.value)}
                  />
                  {errors.end_time && (
                    <small className="form-text text-danger">
                      {errors.end_time}
                    </small>
                  )}
                  <div class="flex max-w-[200px] mx-auto justify-between">
                    <button
                      class="mt-4 bg-gray-800 text-white py-2 px-6 rounded-md hover:bg-gray-700"
                      type="reset"
                      value="Reset"
                    >
                      Clear
                    </button>
                    <button
                      class="mt-4 bg-gray-800 text-white py-2 px-6 rounded-md hover:bg-gray-700"
                      type="button"
                      value="Submit"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      Book
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="flex py-16 bg-gray-100 justify-center">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500, margin: "100px" }}
            />
          </div>
        </div>
        {/* <div>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500, margin: "100px" }}
            />
          </div> */}
      </form>
      <footer className="bg-gray-900 p-10 text-white text-center">
        <p>
          &copy; Copyright 2022, All Rights Reserved by George Brown Company
        </p>
        <p>General Information</p>
        <p>Phone:(807)938-6534</p>
        <p>Address:Box 730, 479 Government StreetDryden, ONP8N 2Z4</p>
      </footer>
    </div>
  );
};

export default Bookings;
