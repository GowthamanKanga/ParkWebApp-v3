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
