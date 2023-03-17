import React, { useState } from "react";

function AddFacilityForm({ onAdd }) {
  const [facilityData, setFacilityData] = useState({
    name: "",
    location: "",
    image: "",
    description: "",
    imageFile: null,
  });

  const [error, setError] = useState("");


  const handleChange = (event) => {
    setFacilityData({
      ...facilityData,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFacilityData({
          ...facilityData,
          image: reader.result,
          imageFile: file,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!facilityData.name) {
      setError("Please enter the facility name.");
      return;
    }
    if (!facilityData.location) {
      setError("Please enter the facility location.");
      return;
    }
    if (!facilityData.image) {
      setError("Please upload a background image.");
      return;
    }
    if (!facilityData.description) {
      setError("Please enter a description for the facility.");
      return;
    }

    onAdd(facilityData);
    setFacilityData({
      name: "",
      location: "",
      image: "",
      description: "",
    });
    setError("");
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Add Facility</h2>
      {error && (
        <div className="text-red-600 mb-4">
          <p>{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="text-sm text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={facilityData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 text-gray-700 bg-white rounded-lg focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="text-sm text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={facilityData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 text-gray-700 bg-white rounded-lg focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="text-sm text-gray-700">
            Background Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-4 py-2 text-gray-700 bg-white rounded-lg focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="text-sm text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={facilityData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 text-gray-700 bg-white rounded-lg focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Add Facility
        </button>
      </form>
    </div>
  );
}

export default AddFacilityForm;
