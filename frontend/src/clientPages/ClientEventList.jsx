import { useState } from "react";
import EventTicket from "../pages/EventTicket";
import { useNavigate } from "react-router-dom";
import AddEventForm from "./AddEventForm";
import EditEventForm from "./EditEventForm";

//import DeniedForm from "./DeniedForm";

const mockData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1617854818583-09e7f077a156?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    name: "New Year's Day Celebration",
    date: "2022-01-01",
    time: "12:00 PM - 3:00 PM",
    location: "Central Park",
    description:
      "Ring in the new year with live music, fireworks, and a countdown to midnight. Food and drinks will be available for purchase. This event is free and open to the public.",
    capacity: 1000,
    price: 0,
    bookings: [],
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1598128558393-70ff21433be0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=789&q=80",
    name: "Valentine's Day Concert",
    date: "2022-02-14",
    time: "7:00 PM - 10:00 PM",
    location: "Carnegie Hall",
    description:
      "Join us for a romantic evening of live music and songs of love. Special guest performers will be announced closer to the event date. Tickets are required and can be purchased online or at the box office.",
    capacity: 500,
    price: 0,
    bookings: [],
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    name: "St. Patrick's Day Parade",
    date: "2022-03-17",
    time: "11:00 AM - 2:00 PM",
    location: "Fifth Avenue",
    description:
      "Don't miss the annual St. Patrick's Day parade in New York City. Watch as thousands of marchers, including Irish dancers, bagpipers, and bands, make their way up Fifth Avenue. The parade ends with a special ceremony at St. Patrick's Cathedral.",
    capacity: 2000,
    price: 0,
    bookings: [],
  },
];

function ClientEventList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const eventsPerPage = 1;
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const [ticketForm, SetTicketForm] = useState("");
  const [event, setEvent] = useState(" ");
  const [response, setResponse] = useState("");
  const [events, setEvents] = useState([]);
  const [eventsData, setEventsData] = useState(mockData);
  const currentEvents = eventsData.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(eventsData.length / eventsPerPage);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  const handleEditButtonClick = (event) => {
    setEditedEvent(event);
    setShowEditModal(true);
  };

  const handleEditEvent = (updatedEvent) => {
    const updatedEventsData = eventsData.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    setEventsData(updatedEventsData);
  };

  const handleEventSubmit = (newEvent) => {
    const id = Math.max(...eventsData.map((e) => e.id)) + 1;
    const updatedEvent = { ...newEvent, id };
    setEventsData([...eventsData, updatedEvent]);
  };;

  const handleDeleteEvent = (eventId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (confirmDelete) {
      const updatedEventsData = eventsData.filter((event) => event.id !== eventId);
      setEventsData(updatedEventsData);
  
      if (indexOfLastEvent > updatedEventsData.length && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };
  
  

  const eventId = localStorage.getItem("eventId");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = {
      event,
    };

    try {
      const res = await fetch(`http://localhost:5501/event/add`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "true",
        },

        mode: "cors",
        body: JSON.stringify(eventData),
      });
      console.log(res);
      if (res.status === 200) {
        setResponse("true");
        {
          setTimeout(() => {
            setResponse("false");
          }, 1500);
        }
      }
      console.log(res.formData);
      // alert('Saved successfully.');
    } catch (err) {
      console.log(err.message);
    }
  };

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
      <EventTicket visible={ticketForm} Onclose={onClose} />
      <div className="h-screen bg-gray-100 flex px-0">
        <div className="w-full">
          <div className="h-screen bg-gray-100 flex items-center justify-center px-0">
            <div className="flex justify-center py-4"></div>
            <div className="event-card">
              <button
                className="text-white bg-blue-500 rounded py-2 px-4 m-3"
                onClick={() => setShowAddEventModal(true)}
              >
                Add Event
              </button>

              {currentEvents.map((event) => (
                <div key={event.id}>
                  <div
                    className="w-full h-[400px] bg-top bg-cover rounded-t"
                    style={{ backgroundImage: `url(${event.image})` }}
                  ></div>
                  <div className="flex flex-col w-full md:flex-row">
                    <div className="flex flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-400 rounded md:flex-col md:items-center md:justify-center md:w-1/4">
                      <div className="md:text-3xl">{event.month}</div>
                      <div className="md:text-3xl">{event.date}</div>
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
                      <button
                        className="text-white bg-red-500 rounded-sm py-2 px-3 mt-2 w-32"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        Delete
                      </button>

                      <button
                        className="text-white bg-green-500 rounded-sm py-2 px-3 mt-2 w-32"
                        onClick={() => handleEditButtonClick(event)}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="flex flex-col w-full md:w-3/4 p-10">
                      <div className="text-xl font-bold text-gray-800">
                        {event.name}
                      </div>
                      <div className="text-sm text-gray-800">
                        {event.startTime} - {event.endTime}
                      </div>
                      <div className="text-sm text-gray-800">
                        {event.location}
                      </div>
                      <div className="text-sm text-gray-800">
                        {event.description}
                      </div>
                      <div className="text-sm text-gray-800">
                        Total Tickets: {event.totalTickets}
                      </div>
                      <div className="text-sm text-gray-800">
                        Tickets Left: {event.ticketsLeft}
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
        </div>
        {showAddEventModal && (
          <Modal onClose={() => setShowAddEventModal(false)}>
            <AddEventForm onEventSubmit={handleEventSubmit} />
          </Modal>
        )}
        {showEditModal && (
          <Modal onClose={() => setShowEditModal(false)}>
            <EditEventForm
              event={editedEvent}
              onEditEvent={handleEditEvent}
              onClose={() => setShowEditModal(false)}
            />
          </Modal>
        )}
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

export default ClientEventList;
