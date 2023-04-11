import { useEffect, useState } from "react";
import EventTicket from "./EventTicket";
import { useNavigate ,useParams} from "react-router-dom";
import Swal from "sweetalert2";
import { useCallback } from "react";
import { set } from "date-fns";

//import DeniedForm from "./DeniedForm";

const mockData = [
  
  {
    "image": "https://example.com/event1.jpg",
    "name": "Concert in the Park",
    "startDate": "2023-07-15",
    "endDate": "2023-07-15",
    "startTime": "18:00",
    "endTime": "22:00",
    "location": "Main Stage",
    "description": "Join us for an evening of live music in the park! Featuring popular local bands and musicians.",
    "numTickets": 500,
    "bookings": [],
    "createdAt": "2023-03-29T08:00:00.000Z",
    "updatedAt": "2023-03-29T08:00:00.000Z"
    ,"imageFile":null
  },
  {
    "image": "https://example.com/event2.jpg",
    "name": "Outdoor Movie Night",
    "startDate": "2023-08-05",
    "endDate": "2023-08-05",
    "startTime": "20:00",
    "endTime": "23:00",
    "location": "Amphitheater",
    "description": "Bring your blankets and chairs for a night of family-friendly movies under the stars!",
    "numTickets": 200,
    "bookings": [],
    "createdAt": "2023-03-29T08:00:00.000Z",
    "updatedAt": "2023-03-29T08:00:00.000Z",
    "imageFile":null
  },
  {
    "image": "https://example.com/event3.jpg",
    "name": "Park Cleanup Day",
    "startDate": "2023-09-02",
    "endDate": "2023-09-02",
    "startTime": "10:00",
    "endTime": "14:00",
    "location": "Various Locations",
    "description": "Help us keep the park clean and beautiful by participating in our annual cleanup day! All volunteers will receive a free t-shirt and lunch.",
    "numTickets": 100,
    "bookings": [],
    "createdAt": "2023-03-29T08:00:00.000Z",
    "updatedAt": "2023-03-29T08:00:00.000Z",
    "imageFile":null
  }

];

function EventList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const eventsPerPage = 1;
  const indexOfLastEvent = currentPage * eventsPerPage;
  const [eventsData, setEventsData] = useState(mockData);
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = eventsData.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(mockData.length / eventsPerPage);
  const [ticketForm, SetTicketForm] = useState("");
  const [event, setEvent] = useState(" ");
  const [response, setResponse] = useState("");
  const { parkId } = useParams();
  const eventId = localStorage.getItem("eventId");

  const navigate = useNavigate();

  useEffect(() => {

    async function fetchData() {
    
      
      
      try {
        const response = await fetch(`http://localhost:3000/park/${parkId}/events`, {
          method: 'GET',
          mode: 'cors',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
       setEventsData(data)
       
 
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  

  const onClose = () => SetTicketForm(false);

  const handleViewButtonClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <body className="bg-white">
      <EventTicket visible={ticketForm} Onclose={onClose} />
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

      <div className="pt-32  bg-white">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          Event List
        </h1>
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
      <div className="h-screen bg-gray-100 flex items-center justify-center px-0">
        <div className="flex flex-col w-full bg-white rounded shadow-lg sm:w-3/4 md:w-1/2 lg:w-3/5">
          <div className="event-card">
          {currentEvents.map((event) => (
                <div key={event.id}>
                
                  <div
                    className="w-full h-[400px] bg-top bg-cover rounded-t"
                    style={{ backgroundImage: `url(http://localhost:3000/uploads/${event.image})` }}
                  ></div>
                  <div className="flex flex-col w-full md:flex-row">
                    <div className="flex flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-400 rounded md:flex-col md:items-center md:justify-center md:w-1/4">
                      <div className="md:text-3xl">{new Date(event.startDate).toLocaleDateString()}</div>
                     
                      <div className="text-sm text-gray-800">
                        {indexOfFirstEvent + 1}/{eventsData.length}
                      </div>
                      <button
                        className="text-white bg-blue-500 rounded-sm py-2 px-3 mt-2 w-32"
                        onClick={() => handleViewButtonClick(event)}
                      >
                        View
                      </button>
                      <button
                        className="text-white bg-blue-500 rounded-sm py-2 px-3 mt-2 w-32"
                        onClick={() => SetTicketForm(true)}
                        value={event}
                        onChange={(e) => setEvent(e.target.value)}
                      >
                        Tickets
                      </button>
                     
                    </div>
                    <div className="flex flex-col md:w-3/4 p-10">
                      <div className="text-xl font-bold text-gray-800">
                        {event.name}
                      </div>
                      <div className="text-sm text-gray-800">
                        {event.startTime} - {event.endTime}
                      </div>
                      <div className="text-sm text-gray-800">
                        {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-800">
                        {event.location}
                      </div>
                      <div className="text-sm text-gray-800">
                        {event.description}
                      </div>
                      <div className="text-sm text-gray-800">
                        Total Tickets: {event.numTickets}
                      </div>
                      
                      <div className="flex justify-center my-8">
                        {currentPage !== 1 && (
                          <button
                            className="text-white bg-blue-500 rounded-sm py-1 px-3 mx-2"
                            onClick={() => handlePageChange(currentPage - 1)}
                          >
                            Previous
                          </button>
                        )}
                        {currentPage !== totalPages && (
                          <button
                            className="text-white bg-blue-500 rounded-sm py-2 px-3 mx-2"
                            onClick={() => handlePageChange(currentPage + 1)}
                          >
                            Next
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EventDetail event={selectedEvent} />
          </Modal>
        )}
      </div>
      <footer className="bg-gray-900 p-10 text-white text-center">
        <p>
          &copy; Copyright 2022, All Rights Reserved by George Brown Company
        </p>
        <p>General Information</p>
        <p>Phone:(807)938-6534</p>
        <p>Address:Box 730, 479 Government StreetDryden, ONP8N 2Z4</p>
      </footer>
    </body>
  );
}

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center">
      <div className="relative w-full max-w-sm">
        <div className="absolute top-0 right-0">
          <button
            className="text-white bg-red-500 rounded-sm py-1 px-3"
            onClick={onClose}
          >
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const EventDetail = ({ event }) => {
  return (
    <div className="p-10 bg-white rounded">
      <div className="text-xl font-bold text-gray-800">{event.name}</div>
      <div className="text-sm text-gray-800">
        {event.startTime} - {event.endTime}
      </div>
      <div className="text-sm text-gray-800">{event.location}</div>
      <div className="text-sm text-gray-800">{event.description}</div>
    </div>
  );
};

export default EventList;
