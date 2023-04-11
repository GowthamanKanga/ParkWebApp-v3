import React, { useState } from "react";

export default function DeniedForm({ visible, Onclose }) {
  const [formOpen, setFormOpen] = useState(true);

  if (!visible) return null;
  return (
<div>
  <div className="fixed inset-0 bg-300 backdrop-blur-sm flex items-center justify-center">
    <div class="flex items-center justify-center p-12">
      <div class="mx-auto w-full max-w-[550px] p-10 bg-white rounded">
        <div class="mb-5 text-center text-base font-medium">
          Please log in or sign up to use this feature
        </div>
        <form>
          <div class="-mx-3 flex flex-wrap">
            <div class="w-full px-3 sm:w-1/2">
              <div class="mb-5">
              </div>
            </div>
          </div>
          <div class="mb-5">
          </div>
          <div className="flex justify-center">
            <button class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none mr-4">
              Login | Sign Up
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
 