import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export default function BookingForm({ visible, Onclose }) {
  const [formOpen, setFormOpen] = useState(true);

  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");

  if (!visible) return null;
  return (
    <div>
      <div className="fixed inset-0   bg-300 backdrop-blur-sm flex items-center justify-center">
        <div class="flex items-center justify-center p-12">
          <div class="mx-auto w-full max-w-[550px] p-10 bg-white rounded">
            <form>
              <div class="-mx-3 flex flex-wrap">
                <div class="w-full px-3 sm:w-1/2">
                <div class="mb-5">
                  <label
                    class="mb-3 block text-base font-medium text-gray-800"
                    for="name "
                  >
                    Username:{" "}
                  </label>
                  <input
                    class="w-full rounded-md border border-[] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2f3d44] focus:shadow-md"
                    id="name"
                    type="text"
                    // value={user}
                    // onChange={(e) => SetUser(e.target.value)}
                    placeholder="Name"
                  />
                </div>
                </div>
              </div>
              <div class="mb-5">
                <label
                  for="guest"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  How many guest are you bringing?
                </label>
                <input
                  type="number"
                  name="guest"
                  id="guest"
                  placeholder="5"
                  min="0"
                  class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
                   <div class="w-full px-3 sm:w-1/2">
                  <div class="mb-5">
                    <label
                      for="date"
                      class="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>

              <div class="-mx-3 flex flex-wrap">

              <div class="w-full px-3 sm:w-1/2">
                  <div class="mb-5">
                    <label
                      for="time"
                      class="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      id="time"
                      class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
           
                <div class="w-full px-3 sm:w-1/2">
                  <div class="mb-5">
                    <label
                      for="time"
                      class="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      id="time"
                      class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
              </div>

              <div class="mb-5">
                <label class="mb-3 block text-base font-medium text-[#07074D]">
                  Are you coming to the event?
                </label>
                <div class="flex items-center space-x-6">
                  <div class="flex items-center">
                    <input
                      type="radio"
                      name="radio1"
                      id="radioButton1"
                      class="h-5 w-5"
                    />
                    <label
                      for="radioButton1"
                      class="pl-3 text-base font-medium text-[#07074D]"
                    >
                      Yes
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      type="radio"
                      name="radio1"
                      id="radioButton2"
                      class="h-5 w-5"
                    />
                    <label
                      for="radioButton2"
                      class="pl-3 text-base font-medium text-[#07074D]"
                    >
                      No
                    </label>
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
    </div>
  );
}
