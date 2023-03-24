import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export default function EventTicket({ visible, Onclose }) {
  const [response, setResponse] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [errors, setErrors] = useState({});
  const [number_Of_Tickets, setNumber_OfTicket] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!first_name) {
      newErrors.first_name = "First name is required";
    }

    if (!last_name) {
      newErrors.last_name = "Last name is required";
    }

    if (!number_Of_Tickets) {
      newErrors.number_OfTicket = "Number of tickets is required";
    }

    return newErrors;
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      const newErrors = validate();
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        try {
          const response = await fetch("http://localhost:5501/tickets/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              first_name,
              last_name,
              number_Of_Tickets,
            }),
          });
          console.log(response);

          if (response.status == 201) {
            setResponse("true");
            {
              setTimeout(() => {
                setResponse("false");
              }, 1500);
            }
          }

          const result = await response.json();
          console.log(result);
          // setResponse(result);
        } catch (error) {
          console.error(error);
        } finally {
          setIsSubmitting(false);
        }
      } else {
        setIsSubmitting(false);
      }
    },
    [first_name,last_name,number_Of_Tickets]
  );


  const navigate = useNavigate();

  if (!visible) return null;
  return (
    <div>
      {response == "true" && (
        <div className="flex rounded-md bg-green-100 p-3">
          <svg
            className="mr-2 h-8 w-8 flex-shrink-0 stroke-current stroke-2 text-green-600"
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0h24v24H0z" stroke="none" />
            <circle cx="12" cy="12" r="9" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <div className="text-green-700">
            <div className="text-xl font-bold">
              Your Event Ticket has been saved
            </div>
          </div>
        </div>
      )}
      <form>
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
                    name="number_Of_Tickets"
                    id="number_Of_Tickets"
                    value={number_Of_Tickets}
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
                  type="submit"
                  value="Submit"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
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
