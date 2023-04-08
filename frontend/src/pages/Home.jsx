import React from "react";
import centreIslandPier from "../images/centre-island-pier.png";

function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
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
          <div
        className='bg-center bg-cover py-32 flex-grow'
        style={{ backgroundImage: `url(${centreIslandPier})` }}
      >
        <div className='container mx-auto px-4'>
          <div className='max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md opacity-90'>
            <h2 className='text-5xl font-bold text-center text-blue-700 mb-10'>
              GBC Park & Recreation
            </h2>
            <p className='text-center text-gray-600'>
              Discover the best parks and recreation facilities in your area and
              plan your next outdoor adventure!
            </p>
          </div>
        </div>
      </div>

      <div className='container mx-auto py-16 px-4'>
        <h2 className='text-4xl font-bold text-center mb-10'>About Us</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">For Park Goers</h3>
            <p className="text-gray-600">
              The Park & Recreation web app is a one-stop-shop for individuals
              who are looking for information on local parks and recreation
              facilities. It provides a user-friendly interface that allows
              individuals to quickly and efficiently access the information they
              need, such as the location of the park, amenities available, and
              upcoming events. This makes it easier for people to plan their
              visits and make the most of their leisure time.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">For Park Owners</h3>
            <p className="text-gray-600">
              In addition to helping the general public, the Park & Recreation
              web app also has a secondary goal of assisting park owners. Many
              parks or recreation facilities may not have a platform for
              providing information about their facilities, and our web
              application aims to fill that gap. Park owners can use our
              platform to edit or add information about their parks, making it
              easier for people to find the information they need and ultimately
              visit the park.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Continuous Improvement</h3>
            <p className="text-gray-600">
              The Park & Recreation web app is constantly evolving and improving
              to better serve the needs of both park owners and the public. The
              web application includes tools for park owners to update
              information about their parks, and for users to provide feedback
              and ratings on parks and recreation facilities they have visited.
              This allows the company to gather valuable insights and identify
              areas for improvement, leading to a better user experience.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-600">
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
      </div>
      <footer className='bg-gray-900 p-10 text-white text-center'>
        <div className="container mx-auto px-4">
          <p className="mb-6">
            &copy; Copyright 2022, All Rights Reserved by George Brown Company
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-4">General Information</h3>
              <p>Phone: (807)938-6534</p>
              <p>Address: Box 730, 479 Government Street Dryden, ON P8N 2Z4</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul>
                <li>
                  <a href="#" className="text-white hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:underline">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Stay Connected</h3>
              <p>Follow us on social media:</p>
              <div className="flex justify-center space-x-4 mt-2">
                <a href="#" className="text-white hover:text-blue-500">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-white hover:text-blue-400">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-white hover:text-red-600">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
