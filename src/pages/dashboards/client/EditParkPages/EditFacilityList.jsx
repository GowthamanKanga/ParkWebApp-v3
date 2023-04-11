import React, { useState } from "react";
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


function FacilityList() {
  const [showModal, setShowModal] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState({});
  const [bookingForm, SetBookingPage] = useState("");

  const onClose = () => SetBookingPage(false);
  const handleView = (facility) => {
    setSelectedFacility(facility);
    setShowModal(true);
  };

  return (
    <div>
      <body className="bg-white">
        <body>
          <div class="h-screen bg-gray-100 pt-20">
            <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
              <div class="rounded-lg md:w-2/3 flex flex-col">
                {mockData.map((data) => {
                  return (
                    <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                      <img
                        src={data.image}
                        alt="product-image"
                        class="w-full rounded-lg sm:w-40"
                      />
                      <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div class="mt-5 sm:mt-0">
                          <h2 class="text-lg font-bold text-gray-900">
                            {data.name}
                          </h2>
                          <p class="mt-1 text-xs text-gray-700">
                            {data.location}
                          </p>
                          <p class="mt-1 text-xs text-gray-700">
                            {data.description}
                          </p>
                        </div>
                        <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                          <div class="flex items-center border-gray-100 flex-col">
                            <div className="flex items-center rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600 mb-2">
                              <button onClick={() => handleView(data)}>
                                View
                              </button>
                            </div>
                            {/* <div className="flex items-center rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                              <button
                                onClick={() => SetBookingPage(true)}
                                className="text-sm mx-2"
                              >
                                Booking
                              </button>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <footer className="bg-gray-900 p-10 text-white text-center">
              <p>
                &copy; Copyright 2022, All Rights Reserved by George Brown
                Company
              </p>
              <p>General Information</p>
              <p>Phone:(807)938-6534</p>
              <p>Address:Box 730, 479 Government StreetDryden, ONP8N 2Z4</p>
            </footer>
          </div>

          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <div className="p-10 bg-white rounded">
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedFacility.name}
                </h2>
                <img
                  src={selectedFacility.image}
                  alt="facility-image"
                  className="w-full rounded-lg"
                />

                <p className="text-sm text-gray-700 mt-4">
                  {selectedFacility.location}
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  {selectedFacility.description}
                </p>
                <ul className="mt-2"></ul>
              </div>
            </Modal>
          )}
        </body>
      </body>
    </div>
  );
}
const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-300 backdrop-blur-sm flex items-center justify-center">
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

export default FacilityList;
