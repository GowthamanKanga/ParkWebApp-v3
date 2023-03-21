import { useState } from "react";
import EventTicket from "../pages/EventTicket";
import { useNavigate } from "react-router-dom";
import AddEventForm from "./AddEventForm";

//import DeniedForm from "./DeniedForm";

const mockData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1617854818583-09e7f077a156?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    month: "Jan",
    date: "01",
    name: "New Year's Day Celebration",
    startTime: "12:00 PM",
    endTime: "3:00 PM",
    location: "Central Park",
    description:
      "Ring in the new year with live music, fireworks, and a countdown to midnight. Food and drinks will be available for purchase. This event is free and open to the public.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1598128558393-70ff21433be0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=789&q=80",
    month: "Feb",
    date: "14",
    name: "Valentine's Day Concert",
    startTime: "7:00 PM",
    endTime: "10:00 PM",
    location: "Carnegie Hall",
    description:
      "Join us for a romantic evening of live music and songs of love. Special guest performers will be announced closer to the event date. Tickets are required and can be purchased online or at the box office.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    month: "Mar",
    date: "17",
    name: "St. Patrick's Day Parade",
    startTime: "11:00 AM",
    endTime: "2:00 PM",
    location: "Fifth Avenue",
    description:
      "Don't miss the annual St. Patrick's Day parade in New York City. Watch as thousands of marchers, including Irish dancers, bagpipers, and bands, make their way up Fifth Avenue. The parade ends with a special ceremony at St. Patrick's Cathedral.",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1587691592099-24045742c181?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    month: "Apr",
    date: "01",
    name: "April Fool's Day Comedy Show",
    startTime: "8:00 PM",
    endTime: "10:00 PM",
    location: "Comedy Cellar",
    description:
      "Get ready to laugh with some of the funniest comedians in the city. The line-up will be announced closer to the event date. This event is for audiences 18 and over. Tickets are required and can be purchased online or at the door.",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1517404215738-15263e9f9178?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    month: "May",
    date: "09",
    name: "Mother's Day Brunch",
    startTime: "11:00 AM",
    endTime: "2:00 PM",
    location: "The Ritz Carlton",
    description:
      "Treat your mom to a special brunch at one of the city's most luxurious hotels. Enjoy a delicious meal, live music, and a special gift for all mothers in attendance. Reservations are required and can be made online or by phone.",
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

  const handleEventSubmit = (newEvent) => {
    const id = Math.max(...eventsData.map((e) => e.id)) + 1;
    const updatedEvent = { ...newEvent, id };
    setEventsData([...eventsData, updatedEvent]);
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
      <EventTicket visible={ticketForm} Onclose={onClose} />
      {/* nav code here  */}
      {/* small div code here */}
      {/* large div code here  */}
      <div className="h-screen bg-gray-100 flex px-0">
        <div className="w-1/3 p-6">
          <AddEventForm onEventSubmit={handleEventSubmit} />
        </div>
        <div className="w-2/3">
          <div className="h-screen bg-gray-100 flex items-center justify-center px-0">
            <div className="event-card">
              {currentEvents.map((event) => (
                <div key={event.id}>
                  <div
                    className="w-full h-72 bg-top bg-cover rounded-t"
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
