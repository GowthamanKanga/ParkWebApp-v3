import React, { useRef, useEffect, useState } from "react";
import { Map, Marker, GoogleApiWrapper,InfoWindow } from "google-maps-react";

const parks = [
  {
    name: "High Park",
    location: "Toronto, ON",
    id: 1,
    lat: 43.653208,
    lng: -79.463415,
  },
];

const ClientParkMap = ({ google }) => {

    const [activeMarker, setActiveMarker] = useState(null);
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPark, setSelectedPark] = useState(null);
    const [lat, setLat] = useState(""); 
    const [lng, setLng] = useState("");


    const onEditButtonClick = () => {
        setModalVisible(true);
      };
    
      const onModalClose = () => {
        setModalVisible(false);
      };
    
      const onUpdateLocation = (lat, lng) => {
        setSelectedPark((prevSelectedPark) => {
          return { ...prevSelectedPark, lat: parseFloat(lat), lng: parseFloat(lng) };
        });
        onModalClose();
      };
  
    const onMarkerClick = (markerProps, marker) => {
      setActiveMarker(marker);
      setShowInfoWindow(true);
    };
  
    const onMapClick = () => {
      setActiveMarker(null);
      setShowInfoWindow(false);
    };
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new google.maps.Map(mapRef.current, {
      zoom: 12,
      center: { lat: 43.653208, lng: -79.463415 },
    });

    parks.forEach((park) => {
      const marker = new google.maps.Marker({
        position: { lat: park.lat, lng: park.lng },
        map,
        title: park.name,
      });
    });
  }, [google]);

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
      <div className="flex flex-col h-screen">
      <Map
        className="flex-1"
        google={google}
        initialCenter={{ lat: 43.653208, lng: -79.463415 }}
        onClick={onMapClick}
        ref={mapRef}
      >
        {parks.map((park) => (
          <Marker
            key={park.id}
            position={{ lat: park.lat, lng: park.lng }}
            title={park.name}
            onClick={onMarkerClick}
          />
        ))}
        {activeMarker && showInfoWindow && (
          <InfoWindow marker={activeMarker} visible={showInfoWindow}>
            <div>
              <h3>{activeMarker.getTitle()}</h3>
              <p>Latitude: {activeMarker.getPosition().lat()}</p>
              <p>Longitude: {activeMarker.getPosition().lng()}</p>
            </div>
          </InfoWindow>
        )}
      </Map>
      <button onClick={onEditButtonClick}>Edit</button>
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Park Location</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onUpdateLocation(lat, lng);
              }}
            >
              <label className="block mb-2">
                Latitude
                <input
                  type="text"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  className="border border-gray-300 p-2 w-full mt-1"
                />
              </label>
              <label className="block mb-2">
                Longitude
                <input
                  type="text"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  className="border border-gray-300 p-2 w-full mt-1"
                />
              </label>
              <div className="flex justify-between items-center mt-4">
                <button
                  type="button"
                  onClick={onModalClose}
                  className="bg-gray-200 px-4 py-2 rounded"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
      <footer className="bg-gray-900 text-white py-10 text-center">
          <p className="mb-4">
            &copy; 2022 George Brown Company. All rights reserved.
          </p>
          <p className="mb-4">General Information</p>
          <p className="mb-4">Phone: (807) 938-6534</p>
          <p>Address: Box 730, 479 Government Street Dryden, ON P8N 2Z4</p>
        </footer>
    </div>
  );
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyCJBPJpIw3o9Oq2MOKz4JtudgaHnSwuIQs",
})(ClientParkMap);
