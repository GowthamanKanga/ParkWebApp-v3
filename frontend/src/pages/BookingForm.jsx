import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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

export default function BookingForm({ visible, onClose, selectedFacility }) {
  const [formOpen, setFormOpen] = useState(true);
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [bookingEquipment, setBookingEquipment] = useState(false);
  const [ownEquipment, setOwnEquipment] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [facility, setFacility] = useState("");

  const handleBookingEquipmentChange = (event) => {
    setBookingEquipment(event.target.checked);
  };

  const handleOwnEquipmentChange = (event) => {
    setOwnEquipment(event.target.checked);
  };

  const handleEquipmentChange = (event) => {
    const equipmentName = event.target.name;
    if (event.target.checked) {
      setSelectedEquipment((prevSelectedEquipment) => [
        ...prevSelectedEquipment,
        equipmentName,
      ]);
    } else {
      setSelectedEquipment((prevSelectedEquipment) =>
        prevSelectedEquipment.filter((name) => name !== equipmentName)
      );
    }
  };

  const handleFacilityChange = (event) => {
    setFacility(event.target.value);
  };

  if (!visible) return null;
  return (
    <div>
      <div className="fixed inset-0 bg-opacity-30 bg-black flex items-center justify-center">
        <div className="bg-white p-12 rounded-lg">
          <button
            className="absolute top-3 right-3 text-red-500"
            onClick={onClose}
          >
            X
          </button>
          <form>
            <div className="mb-5">
              <label
                className="mb-3 block text-base font-medium text-gray-800"
                htmlFor="name"
              >
                Username:
              </label>
              <input
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-600 outline-none focus:border-gray-800 focus:shadow-md"
                id="name"
                type="text"
                placeholder="Name"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="guest"
                className="mb-3 block text-base font-medium text-gray-800"
              >
                How many guests are you bringing?
              </label>
              <input
                type="number"
                name="guest"
                id="guest"
                placeholder="5"
                min="0"
                className="w-full appearance-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-600 outline-none focus:border-blue-500 focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="date"
                className="mb-3 block text-base font-medium text-gray-800"
              >
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-600 outline-none focus:border-blue-500 focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="time"
                className="mb-3 block text-base font-medium text-gray-800"
              >
                Time
              </label>
              <input
                type="time"
                name="time"
                id="time"
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-600 outline-none focus:border-blue-500 focus:shadow-md"
              />
            </div>
            <div class="mb-5">
              <label class="mb-3 block text-base font-medium text-gray-800">
                Equipment:
              </label>
              <div>
                <input
                  type="checkbox"
                  id="booking_equipment"
                  checked={bookingEquipment}
                  onChange={handleBookingEquipmentChange}
                />
                <label for="booking_equipment" class="ml-2">
                  Book equipment from the facility
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="own_equipment"
                  checked={ownEquipment}
                  onChange={handleOwnEquipmentChange}
                />
                <label for="own_equipment" class="ml-2">
                  Bring own equipment
                </label>
              </div>
              {bookingEquipment && selectedFacility && (
                <div className="mt-4">
                  <h3 className="mb-2 text-base font-medium text-gray-800">
                    Facility Equipment:
                  </h3>
                  <div>
                    <details>
                      <summary className="cursor-pointer text-indigo-600">
                        {selectedFacility.name} Equipment
                      </summary>
                      {selectedFacility.equipment.map((equipment, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 mb-2 pl-4"
                        >
                          <input
                            type="checkbox"
                            name={equipment.name}
                            checked={selectedEquipment.includes(equipment.name)}
                            onChange={handleEquipmentChange}
                            className="form-checkbox text-indigo-600"
                          />
                          <label className="ml-2 text-gray-700">
                            {equipment.name}
                          </label>
                        </div>
                      ))}
                    </details>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-gray-800">
                Are you coming to the event?
              </label>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="radio1"
                    id="radioButton1"
                    className="h-5 w-5"
                  />
                  <label
                    htmlFor="radioButton1"
                    className="pl-3 text-base font-medium text-gray-800"
                  >
                    Yes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="radio1"
                    id="radioButton2"
                    className="h-5 w-5"
                  />
                  <label
                    htmlFor="radioButton2"
                    className="pl-3 text-base font-medium text-gray-800"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="hover:shadow-lg rounded-md bg-blue-500 py-3 px-8 text-center text-base font-semibold text-white outline-none mr-4"
              >
                Submit
              </button>
              <button
                type="button"
                className="hover:shadow-lg rounded-md bg-blue-500 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                onClick={onClose}
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
