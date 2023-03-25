import React, { useState } from "react";

function AddFacilityForm({ onAdd }) {
  const [facilityData, setFacilityData] = useState({
    name: "",
    location: "",
    image: "",
    description: "",
    imageFile: null,
    capacity: "",
    equipment: [],
    visitors: {
      max: "",
      min: "",
    },
  });

  const [error, setError] = useState("");
  

  const handleEquipmentChange = (index, name, value) => {
    const updatedEquipment = [...facilityData.equipment];
    updatedEquipment[index] = { ...updatedEquipment[index], [name]: value };
    setFacilityData({ ...facilityData, equipment: updatedEquipment });
  };

  const addEquipment = () => {
    setFacilityData({
      ...facilityData,
      equipment: [
        ...facilityData.equipment,
        { name: "", quantity: "", description: "" },
      ],
    });
  };

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
    if (!facilityData.capacity) {
      setError("Please enter the facility capacity.");
      return;
    }
    if (!facilityData.visitors.min || !facilityData.visitors.max) {
      setError("Please enter both minimum and maximum number of visitors.");
      return;
    }
    if (facilityData.equipment.some(item => !item.name || !item.quantity || !item.description)) {
      setError("Please fill in all the equipment fields.");
      return;
    }
  
    onAdd(facilityData);
    setFacilityData({
      name: "",
      location: "",
      image: "",
      description: "",
      capacity: "",
      equipment: [],
      visitors: {
        max: "",
        min: "",
      },
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

        <div className="mb-4">
          <label htmlFor="capacity" className="text-sm text-gray-700">
            Capacity
          </label>
          <input
            type="number"
            name="capacity"
            value={facilityData.capacity}
            onChange={handleChange}
            className="w-full px-4 py-2 text-gray-700 bg-white rounded-lg focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-700">Visitors</label>
          <div className="flex space-x-2">
            <input
              type="number"
              name="min"
              placeholder="Min"
              value={facilityData.visitors.min}
              onChange={(e) =>
                setFacilityData({
                  ...facilityData,
                  visitors: { ...facilityData.visitors, min: e.target.value },
                })
              }
              className="w-full px-4 py-2 text-gray-700 bg-white rounded-lg focus:outline-none focus:shadow-outline"
            />
            <input
              type="number"
              name="max"
              placeholder="Max"
              value={facilityData.visitors.max}
              onChange={(e) =>
                setFacilityData({
                  ...facilityData,
                  visitors: { ...facilityData.visitors, max: e.target.value },
                })
              }
              className="w-full px-4 py-2 text-gray-700 bg-white rounded-lg focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-700 block mb-2">Equipment</label>
          {facilityData.equipment.map((item, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={item.name}
                onChange={(e) =>
                  handleEquipmentChange(index, e.target.name, e.target.value)
                }
                className="w-full px-4 py-2 text-gray-700 bg-white rounded-lg focus:outline-none focus:shadow-outline"
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) =>
                  handleEquipmentChange(index, e.target.name, e.target.value)
                }
                className="w-full px-4 py-2 text-gray-700 bg-white rounded-lg focus:outline-none focus:shadow-outline"
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={item.description}
                onChange={(e) =>
                  handleEquipmentChange(index, e.target.name, e.target.value)
                }
                className="w-full px-4 py-2 text-gray-700 bg-white rounded-lg focus:outline-none focus:shadow-outline"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addEquipment}
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Add Equipment
          </button>
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
