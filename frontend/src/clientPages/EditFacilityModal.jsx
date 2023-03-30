import React, { useState } from "react";

function EditFacilityModal({ show, onClose, facility, onUpdate }) {
  const [name, setName] = useState(facility.name);
  const [location, setLocation] = useState(facility.location);
  const [description, setDescription] = useState(facility.description);
  const [image, setImage] = useState(facility.image);
  const [capacity, setCapacity] = useState(facility.capacity);
  const [visitors, setVisitors] = useState(facility.visitors);
  const [equipment, setEquipment] = useState(facility.equipment);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!name) newErrors.name = "Name is required";
    if (!location) newErrors.location = "Location is required";
    if (!description) newErrors.description = "Description is required";
    if (!image) newErrors.image = "Image is required";
    if (!capacity) newErrors.capacity = "Capacity is required";
    if (!visitors) newErrors.visitors = "Visitors limits are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onUpdate({
      ...facility,
      name,
      location,
      description,
      image,
      capacity,
      visitors,
      equipment,
    });
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEquipmentChange = (index, field, value) => {
    const newEquipment = [...equipment];
    newEquipment[index][field] = value;
    setEquipment(newEquipment);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
        <div
          className="bg-white rounded-lg px-4 py-5 w-full max-w-md mx-auto z-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <h3
                className="text-gray-800 text-3xl font-bold text-center mb-4"
                id="modal-headline"
              >
                Edit Facility
              </h3>
              <input
                  className={`form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-mde ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Facility Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
                <input
                  className={`form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  }`}
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                />
                {errors.location && (
                  <p className="text-red-500               text-sm">
                    {errors.location}
                  </p>
                )}
                <input
                  className={`form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm ${
                    errors.image ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image}</p>
                )}
            </div>

            {/* Equipment list */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-900">
                Equipment:
              </h4>
              {equipment.map((item, index) => (
                <div key={index} className="space-y-2">
                  <input
                    className="form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleEquipmentChange(index, "name", e.target.value)
                    }
                    placeholder="Equipment Name"
                  />
                  <input
                    className="form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleEquipmentChange(index, "quantity", e.target.value)
                    }
                    placeholder="Quantity"
                  />
                  <input
                    className="form-control w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      handleEquipmentChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Description"
                  />
                </div>
              ))}
            </div>

            <div className="mt-5 sm:mt-6 space-x-3">
              <button
                type="submit"
                className="mt-4 bg-gray-800 text-white py-2 px-6 rounded-md hover:bg-gray-700"
              >
                Save Changes
              </button>
              <button
                onClick={onClose}
                className="mt-4 bg-gray-800 text-white py-2 px-6 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditFacilityModal;