import React from "react";
import centreIslandPier from "../images/centre-island-pier.png";

function Home() {
  return (
    <div>
      <body>
        <div className="flex items-center justify-center h-screen bg-gray-200">
          <nav className="fixed top-0 left-0 z-20 w-full border-b border-gray-200 bg-white py-2.5 px-6 sm:px-4">
            <div className="container mx-auto flex max-w-6xl flex-wrap items-center justify-between">
              <a href="/Home" className="flex items-center">
                <span className="self-center whitespace-nowrap text-xl font-semibold">
                  GBC Park & Recreation
                </span>
              </a>
              <div className="mt-2 sm:mt-0 sm:flex md:order-2">
                <button
                  type="button"
                  className="rounde mr-3 hidden border border-blue-700 py-1.5 px-6 text-center text-sm font-medium text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 md:inline-block rounded-lg"
                >
                  Login
                </button>
                <button
                  type="button"
                  className="rounde mr-3 hidden bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg"
                >
                  Register
                </button>
                <button
                  data-collapse-toggle="navbar-sticky"
                  type="button"
                  className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
                  aria-controls="navbar-sticky"
                  aria-expanded="false"
                >
                  <svg
                    className="h-6 w-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div
                className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
                id="navbar-sticky"
              >
                <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium">
                  <li>
                    <a
                      href="/Home"
                      className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-blue-700"
                      aria-current="page"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/ParkList"
                      className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                    >
                      Park List
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="w-100 h-70">
        <h2 className="text-4xl font-bold text-center mb-10">About Us</h2>
        
        <p className="mb-10 text-xl text-center text-gray-600">
          The Park & Recreation web app is a one-stop-shop for individuals
          who are looking for information on local parks and recreation
          facilities. It provides a user-friendly interface that allows
          individuals to quickly and efficiently access the information they
          need, such as the location of the park, amenities available, and
          upcoming events. This makes it easier for people to plan their
          visits and make the most of their leisure time.
        </p>
        <p className="mb-10 text-xl text-center text-gray-800">
          In addition to helping the general public, the Park & Recreation
          web app also has a secondary goal of assisting park owners. Many
          parks or recreation facilities may not have a platform for
          providing information about their facilities, and our web
          application aims to fill that gap. Park owners can use our
          platform to edit or add information about their parks, making it
          easier for people to find the information they need and ultimately
          visit the park.
        </p>
        <p className="mb-10 text-xl text-center text-gray-800">
          The Park & Recreation web app is constantly evolving and improving
          to better serve the needs of both park owners and the public. The
          web application includes tools for park owners to update
          information about their parks, and for users to provide feedback
          and ratings on parks and recreation facilities they have visited.
          This allows the company to gather valuable insights and identify
          areas for improvement, leading to a better user experience.
        </p>
        <p className="text-xl text-center text-gray-800">
          In conclusion, the Park & Recreation web app is a valuable
          resource for individuals looking for information on local parks
          and recreation facilities, and for park owners who want to provide
          information about their facilities to the public. The platform is
          user-friendly, constantly evolving, and designed to make it easier
          for people to find the information they need and to plan their
          visits to the park. By providing this information, the company
          hopes to enhance the public's experience with their local parks
          and recreation facilities.
        </p>
      </div>

        </div>
        <footer className="bg-gray-900 p-10 text-white text-center">
        <p>
          &copy; Copyright 2022, All Rights Reserved by George Brown Company
        </p>
        <p>General Information</p>
        <p>Phone:(807)938-6534</p>
        <p>Address:Box 730, 479 Government StreetDryden, ONP8N 2Z4</p>
      </footer>
      </body>
    </div>
  );
}

export default Home;