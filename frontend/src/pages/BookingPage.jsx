import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
//import { ReactComponent as ArrowRight } from '../assets/arrow-right.svg';
//import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';
//import { ReactComponent as Logo } from '../assets/logo.svg';
//import {ReactComponent as ArrowRight} from "../images/arrow-right.svg"
import { Calendar, dateFnsLocalizer, Navigate } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { moment } from "moment";
import Swal from "sweetalert2";

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
  },
  {
    title: "Booking 2",
    name: "Gowtham",
    facility: "Petting Zoo",
    start: new Date(2023, 1, 9, 19),
    end: new Date(2023, 1, 9, 21),
  },
  {
    title: "Booking 3",
    name: "Yaroslav",
    facility: "Hedge Maze",
    start: new Date(2023, 1, 10, 1, 23, 43),
    end: new Date(2023, 1, 10, 3, 23, 43),
  },
  {
    title: "Booking 4",
    name: "Yagnik",
    facility: "Maze",
    start: new Date(2023, 2, 12, 1, 23, 43),
    end: new Date(2023, 1, 10, 3, 23, 43),
  },
];

const mockData = [
  { name: "Facility 1" },
  { name: "Facility 2" },
  { name: "Facility 3" },
  { name: "Facility 4" },
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

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newErrors = validate();
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      try {
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
  }),
});
console.log(response);

        const result = await response.json();
        setResponse(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  }, [  user,  facility,  booking_date,  amount_of_guests,  start_time,  end_time,]);

  

  return (
    <div>
      <form>
        <div>
          <div class="flex py-16 justify-center">
            <div class="mx-auto w-full max-w-[450px] shadow-md px-12 py-12 bg-white rounded-2xl">
              <div>
                <h1 class="text-gray-800 text-3xl font-bold text-center mb-4">
                  Book a Facility
                </h1>
              </div>
              <form onsubmit="Submit();">
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
                    onChange={(e) => setFacility(e.target.value)}
                  >
                    {mockData.map((facilityOption, index) => (
                      <option key={index} value={facilityOption.name}>
                        {facilityOption.name}
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
        </div>
        <div>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, margin: "100px" }}
          />
        </div>
      </form>
    </div>
  );
};

export default Bookings;
