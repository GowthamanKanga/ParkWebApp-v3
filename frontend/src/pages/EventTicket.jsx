import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from 'react';
import Swal from "sweetalert2";

export default function EventTicket({ visible, Onclose }) {
  const [formOpen, setFormOpen] = useState(true);

  const [response, setResponse] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [event_date, setEvent_date] = useState("")
  const [event_time, setEvent_time] = useState("")
  const [number_OfTicket, setNumber_OfTicket] = useState("")
  
  const TicketID = localStorage.getItem("TicketID");

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/EventList/${TicketID}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        method: "GET",
        mode: "cors",
      })
      if (res.status != 200) {
        {
          setTimeout(() => {
            Swal.fire({
              title: "Time Out",
              text: "Ticket Purchase Time Out ! Repurchase Ticket",
              icon: "error",
              confirmButtonText: "ok",
            })
            navigate("/EventList")("false")
          },2000)
        }
      }
      const resp = await res.json();
      console.log(resp)

      const {
        first_name,
        last_name,
        event_date,
        event_time,
        number_OfTicket,
      } = resp;
      setfirst_name(first_name)
      setlast_name(last_name)
      setEvent_date(event_date)
      setEvent_time(event_time)
      setNumber_OfTicket(number_OfTicket)
    }catch(err) {
      console.log(err.mess)
    }
  }

  const callback = useCallback(() => fetchData(), [TicketID])

  useEffect(() => {
    callback()
  }, [callback])

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      first_name,
      last_name,
      event_date,
      event_time,
      number_OfTicket,

    };

    try {
       const res = await fetch(`http://localhost/EventList/update${TicketID}`, {
       method: "PUT", 
       header: {
          "content-type" : "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(userData),
       })
       console.log(res);
      if (res.status == 200) {
        setResponse("true")
        {
          setTimeout(() => {
            setResponse("false")
          }, 1500)
        }
       }
      

       console.log(res.formData)
    } 
    catch(err) {
      console.log(err.message)
    }
  }

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
              </div>

              <div class="-mx-3 flex flex-wrap">
                <div class="w-full px-3 sm:w-1/2">
                  <div class="mb-5">
                    <label
                      for="event_date"
                      class="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      name="event_date"
                      id="event_date"
                      value={event_date}
                      onChange={(e) => setEvent_date(e.target.value)}
                      class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div class="w-full px-3 sm:w-1/2">
                  <div class="mb-5">
                    <label
                      for="event_time"
                      class="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Time
                    </label>
                    <input
                      type="time"
                      name="event_time"
                      id="event_time"
                      value={event_time}
                      onChange={(e) => setEvent_time(e.target.value)}
                      class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none mr-4">
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
