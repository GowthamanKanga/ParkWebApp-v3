import React, { useState } from "react";
import BookingForm from "../pages/BookingForm";
import AddFacilityForm from "./AddFacilityForm";
import EditFacilityModal from "./EditFacilityModal";

const mockData = [
  {
    id: 1,
    name: "Playground",
    location: "Area 1",
    image: "https://via.placeholder.com/150",
    description:
      "A playground with swings, slides and monkey bars for children to play on.",
    capacity: 25,
    equipment: [
      {
        name: "Swing",
        quantity: 4,
        description: "Metal swings with rubber seats",
      },
      {
        name: "Slide",
        quantity: 2,
        description: "Plastic slides for children",
      },
    ],
    visitors: {
      max: 30,
      min: 5,
    },
  },
  {
    id: 2,
    name: "Tennis Court",
    location: "Area 2",
    image: "https://via.placeholder.com/150",
    description: "A full-size tennis court with lights for evening play.",
    capacity: 4,
    equipment: [
      {
        name: "Tennis Racket",
        quantity: 4,
        description: "Standard tennis rackets for adults",
      },
      {
        name: "Tennis Ball",
        quantity: 12,
        description: "Standard tennis balls",
      },
    ],
    visitors: {
      max: 10,
      min: 2,
    },
  },
  {
    id: 3,
    name: "Basketball Court",
    location: "Area 3",
    image: "https://via.placeholder.com/150",
    description: "A regulation-size basketball court with adjustable hoops.",
    capacity: 10,
    equipment: [
      {
        name: "Basketball",
        quantity: 4,
        description: "Regulation-size basketballs",
      },
      {
        name: "Hoop",
        quantity: 2,
        description: "Adjustable basketball hoops",
      },
    ],
    visitors: {
      max: 20,
      min: 2,
    },
  },
];
function AddFacilityModal({ onAdd, onClose }) {
  return (
    <div className="fixed inset-0 z-30 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          <button
            className="close-button absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:shadow-outline p-1 rounded-full transition-colors duration-200"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <AddFacilityForm onAdd={onAdd} />
        </div>
      </div>
    </div>
  );
}

function ClientFacilityList() {
  const [showModal, setShowModal] = useState(false);
  const [bookingForm, setBookingForm] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState({});
  const [searchText, setSearchText] = useState("");
  const [itemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [facilities, setFacilities] = useState(mockData);
  const [showEditModal, setShowEditModal] = useState(false);
  const [facilityToEdit, setFacilityToEdit] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [facilityToDelete, setFacilityToDelete] = useState(null);
  const [showAddFacilityModal, setShowAddFacilityModal] = useState(false);

  const toggleAddFacilityModal = () => {
    setShowAddFacilityModal(!showAddFacilityModal);
  };

  const handleEdit = (facility) => {
    setFacilityToEdit(facility);
    setShowEditModal(true);
  };

  const handleUpdate = (updatedFacility) => {
    setFacilities(
      facilities.map((facility) =>
        facility.id === updatedFacility.id ? updatedFacility : facility
      )
    );
  };

  const handleDelete = (id) => {
    setFacilityToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setFacilities(
      facilities.filter((facility) => facility.id !== facilityToDelete)
    );
    setShowDeleteModal(false);
  };

  const handleAddFacility = (newFacility) => {
    setFacilities([...facilities, newFacility]);
  };

  const onClose = () => setBookingForm(false);
  const handleView = (facility) => {
    setSelectedFacility(facility);
    setShowModal(true);
  };

  const filteredData = facilities.filter((facility) => {
    return (
      facility.name.toLowerCase().includes(searchText.toLowerCase()) ||
      facility.location.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const addFacility = (newFacility) => {
    setFacilities([
      ...facilities,
      { ...newFacility, id: facilities.length + 1 },
    ]);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function FacilityCard({ facility }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3>{facility.name}</h3>
        <p>{facility.location}</p>
        <img src={facility.image} alt={facility.name} />
        <p>{facility.description}</p>
        <p>Equipment:</p>
        <ul>
          {facility.equipment.map((item) => (
            <li key={item.name}>
              {item.name} ({item.quantity}): {item.description}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <>
    <div>
      <BookingForm visible={bookingForm} onClose={onClose} />
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
      <div className="bg-white">
        <div className="h-screen bg-gray-100 pt-20">
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 mb-10">
            {" "}
            <div className="rounded-lg md:w-2/3 flex flex-col">
              <div className="mb-6">
                <input
                  type="text"
                  className="w-full px-4 py-2 text-gray-700 bg-white rounded-lg focus:outline-none focus:shadow-outline"
                  placeholder="Search for a facility"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                />
              </div>
              <div className="mb-6 w-full md:w-auto">
                <button
                  className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:shadow-outline"
                  onClick={toggleAddFacilityModal}
                >
                  Add Facility
                </button>
              </div>
              {currentItems.map((data) => {
                return (
                  <div
                    key={data.id}
                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                  >
                    <img
                      src={data.image}
                      alt="product-image"
                      className="w-full rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {data.name}
                        </h2>
                        <p className="mt-1 text-xs text-gray-700">
                          {data.location}
                        </p>
                        <p className="mt-1 text-xs text-gray-700">
                          {data.description}
                        </p>
                        <p className="mt-1 text-xs text-gray-700">
                          Capacity: {data.capacity}
                        </p>
                        <p className="mt-1 text-xs text-gray-700">
                          Visitors allowed: {data.visitors.min} -{" "}
                          {data.visitors.max}
                        </p>
                        <div className="mt-2">
                          <h4 className="text-xs font-semibold text-gray-900">
                            Equipment:
                          </h4>
                          <ul className="list-disc pl-5">
                            {data.equipment.map((item, index) => (
                              <li key={index} className="text-xs text-gray-700">
                                {item.name} ({item.quantity}):{" "}
                                {item.description}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-8 flex flex-col space-y-4 items-center sm:mt-0">
                        <div className="flex items-center justify-center">
                          <div className="flex items-center rounded-lg bg-blue-500 px-2 py-1">
                            <button
                              className="text-white font-bold uppercase px-4 py-2 text-xs rounded-lg"
                              onClick={() => handleView(data)}
                            >
                              View
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-center">
                          <div className="flex items-center rounded-lg bg-red-600 px-2 py-1">
                            <button
                              className="text-white font-bold uppercase px-4 py-2 text-xs rounded-lg"
                              onClick={() => handleDelete(data.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-center">
                          <div className="flex items-center rounded-lg bg-green-600 px-2 py-1">
                            <button
                              className="text-white font-bold uppercase px-4 py-2 text-xs rounded-lg"
                              onClick={() => handleEdit(data)}
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <nav>
                <ul className="flex justify-center items-center list-none my-4">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index} className="mx-1">
                      <button
                        onClick={() => handlePageChange(index + 1)}
                        className={`
                          px-4 py-2 text-sm font-medium rounded-md
                          ${
                            index + 1 === currentPage
                              ? "bg-blue-500 text-white"
                              : "text-blue-500 bg-white hover:bg-blue-200"
                          }
                        `}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
        
      </div>
      {showModal && (
        <div className="fixed z-30 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="mt-16 sm:mt-0">
              <div
                className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div>
                  <img
                    src={selectedFacility.image}
                    alt="facility-image"
                    className="w-full rounded-lg object-cover h-64"
                  />
                  <div className="mt-3 sm:mt-5">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      {selectedFacility.name}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {selectedFacility.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        Location: {selectedFacility.location}
                      </p>
                      <p className="text-sm text-gray-500">
                        Capacity: {selectedFacility.capacity}
                      </p>
                      <p className="text-sm text-gray-500">
                        Visitors allowed: {selectedFacility.visitors.min} -{" "}
                        {selectedFacility.visitors.max}
                      </p>
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-900">
                          Equipment:
                        </h4>
                        <ul className="list-disc pl-5">
                          {selectedFacility.equipment.map((item, index) => (
                            <li
                              key={index}
                              className="text-sm text-gray-500 mb-1"
                            >
                              {item.name} ({item.quantity}): {item.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6 flex justify-center">
                  <button
                    onClick={() => {
                      setBookingForm(true);
                      setShowModal(false);
                    }}
                    className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                  >
                    Open Booking Form
                  </button>
                </div>

                <div className="absolute top-0 right-0 m-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M66l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <EditFacilityModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          facility={facilityToEdit}
          onUpdate={handleUpdate}
        />
      )}

      {showAddFacilityModal && (
        <AddFacilityModal
          onAdd={addFacility}
          onClose={toggleAddFacilityModal}
        />
      )}

      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="w-screen h-screen flex items-center justify-center">
              <div
                className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="mt-3 text-center sm:mt-5">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Are you sure you want to delete this facility?
                  </h3>
                </div>
                <div className="mt-5 sm:mt-6 flex justify-center">
                  <button
                    onClick={handleConfirmDelete}
                    className="bg-red-600 text-white font-bold py-2 px-4 mr-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                  >
                    Cancel
                  </button>
                </div>

                <div className="absolute top-0 right-0 m-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <footer className="bg-gray-900 p-10 text-white text-center">
          <p>
            &copy; Copyright 2022, All Rights Reserved by George Brown Company
          </p>
          <p>General Information</p>
          <p>Phone:(807)938-6534</p>
          <p>Address:Box 730, 479 Government Street Dryden, ONP8N 2Z4</p>
        </footer>
    </>
  );
}

export default ClientFacilityList;
