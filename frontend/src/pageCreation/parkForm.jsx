import React, { useRef, useState } from "react";

function ParkForm() {
  const Collapsible = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="border rounded-md mb-4">
        <button
          className="w-full p-2 bg-gray-200 rounded-md text-left font-bold focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {title}
        </button>
        {isOpen && <div className="p-4">{children}</div>}
      </div>
    );
  };

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
    console.log(parkData);
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

  const createDropHandler = (section) => (event) => {
    event.preventDefault();
    setDragging((prev) => ({ ...prev, [section]: false }));

    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles((prevFiles) => ({
      ...prevFiles,
      [section]: [...(prevFiles[section] || []), ...droppedFiles],
    }));
  };

  const sections = [
    "Land title/deed",
    "Purchase agreement",
    "Zoning by laws",
    "Building permits",
  ];

  const fileInputRef = useRef();

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const validateInput = (name) => {
    switch (name) {
      case "email":
        return parkData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
          ? ""
          : "Invalid email address";
      case "phone":
        return parkData.phone.match(
          /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/
        )
          ? ""
          : "Invalid phone number";
      default:
        return parkData[name].length > 0 ? "" : "This field is required";
    }
  };

  const renderInputError = (name) => {
    const errorMessage = validateInput(name);
    return errorMessage ? (
      <p className="mt-1 text-xs text-red-600">{errorMessage}</p>
    ) : null;
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="space-y-6 max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Park Information
        </h1>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Park Client Owner", name: "parkClientOwner", type: "text" },
            { label: "Park Name", name: "parkName", type: "text" },
            { label: "Park Location", name: "parkLocation", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phone", type: "tel" },
          ].map(({ label, name, type }) => (
            <div key={name} className="block">
              <label className="text-gray-700">{label}:</label>
              <input
                type={type}
                name={name}
                value={parkData[name]}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {renderInputError(name)}
            </div>
          ))}
        </div>

        <div className="space-y-6 mt-6">
          {sections.map((section) => (
            <Collapsible key={section} title={section}>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={createDropHandler(section)}
                className={`border-2 border-dashed p-4 rounded-md ${
                  dragging[section] ? "border-indigo-300" : "border-gray-300"
                }`}
              >
                <p className="text-center">
                  {files[section] && files[section].length > 0 ? (
                    <ul className="list-disc list-inside">
                      {files[section].map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  ) : (
                    "Drag and drop files here or click to select"
                  )}
                </p>
              </div>
            </Collapsible>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
