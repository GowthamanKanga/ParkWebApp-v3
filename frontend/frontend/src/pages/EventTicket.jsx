import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import Swal from "sweetalert2";

export default function EventTicket({ visible, Onclose }) {
  const [response, setResponse] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [errors, setErrors] = useState({});
  const [number_OfTicket, setNumber_OfTicket] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!first_name) {
      newErrors.first_name = "First name is required";
    }

    if (!last_name) {
      newErrors.last_name = "Last name is required";
    }

    if (!number_OfTicket) {
      newErrors.number_OfTicket = "Number of tickets is required";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    let userData;
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      userData = {
        first_name,
        last_name,
        number_OfTicket,
      };
      setIsSubmitting(false);
    }

    try {
      const res = await fetch(`http://localhost:5501/booking/add`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "true",
        },
        mode: "cors",
        body: JSON.stringify(userData),
      });
      console.log(res);
      if (!res.ok) {
        throw new Error(`Status code error: ${res.status}`);
      }
      setResponse("true");
      setTimeout(() => {
        setResponse("false");
      }, 1500);
    } catch (error) {
      console.error(error);
      setResponse("error");
    }
  };

  if (!visible) return null;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="fixed inset-0   bg-300 backdrop-blur-sm flex items-center justify-center">
          <div class="flex items-center justify-center p-12">
            <div class="mx-auto w-full max-w-[550px] p-10 bg-white rounded">
              <form>
                <div class="-mx-3 flex flex-wrap">
                  <div class="w-full px-3 sm:w-1/2">
                    <div class="mb-5">
                      <label
                        for="first_name"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        value={first_name}
                        onChange={(e) => setfirst_name(e.target.value)}
                        placeholder="First Name"
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                      {errors.first_name && (
                        <small className="form-text text-danger">
                          {errors.first_name}
                        </small>
                      )}
                    </div>
                  </div>
                  <div class="w-full px-3 sm:w-1/2">
                    <div class="mb-5">
                      <label
                        for="last_name"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        value={last_name}
                        onChange={(e) => setlast_name(e.target.value)}
                        placeholder="Last Name"
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                      {errors.last_name && (
                        <small className="form-text text-danger">
                          {errors.last_name}
                        </small>
                      )}
                    </div>
                  </div>
                </div>
                <div class="mb-5">
                  <label
                    for="guest"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Number of Ticket you want to Order?
                  </label>
                  <input
                    type="number"
                    name="number_OfTicket"
                    id="number_OfTicket"
                    value={number_OfTicket}
                    onChange={(e) => setNumber_OfTicket(e.target.value)}
                    placeholder="5"
                    min="0"
                    class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                  {errors.number_OfTicket && (
                    <small className="form-text text-danger">
                      {errors.number_OfTicket}
                    </small>
                  )}
                </div>
                <div className="flex justify-center">
                  <button
                    disabled={isSubmitting}
                    class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none mr-4"
                  >
                    Submit
                  </button>
                  <button
                    className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                    onClick={Onclose}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
