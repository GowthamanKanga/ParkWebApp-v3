import React, { useState } from "react";

function ParkForm() {
  const [parkData, setParkData] = useState({
    parkClientOwner: "",
    parkName: "",
    parkLocation: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setParkData({ ...parkData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(parkData); // replace with your own form submission logic
  };

  const handleReset = () => {
    setParkData({
      parkClientOwner: "",
      parkName: "",
      parkLocation: "",
      email: "",
      phone: "",
    });
    setFiles([]);
  };

  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDragOver = (event) => {
    event.preventDefault();
    if (!dragging) {
      setDragging(true);
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="space-y-4 max-w-2xl mx-auto"
      >
        <label className="block">
          <span className="text-gray-700">Park Client Owner:</span>
          <input
            type="text"
            name="parkClientOwner"
            value={parkData.parkClientOwner}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Park Name:</span>
          <input
            type="text"
            name="parkName"
            value={parkData.parkName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Park Location:</span>
          <input
            type="text"
            name="parkLocation"
            value={parkData.parkLocation}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Email:</span>
          <input
            type="email"
            name="email"
            value={parkData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Phone:</span>
          <input
            type="tel"
            name="phone"
            value={parkData.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed p-4 rounded-md ${
            dragging ? "border-indigo-300" : "border-gray-300"
          }`}
        >
          <p className="text-center">
            {files.length > 0 ? (
              <ul className="list-disc list-inside">
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            ) : (
              "Drag and drop files here or click to select"
            )}
          </p>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2           focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
          <button
            type="reset"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default ParkForm;
