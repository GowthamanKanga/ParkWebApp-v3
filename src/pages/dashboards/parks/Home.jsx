import React from "react";

function Home() {
  return (
    <div>
      <body>
        <div className="flex min-h-screen flex-col">
          <nav className="fixed top-0 left-0 z-20 w-full border-b border-gray-200 bg-white py-2.5 px-6 sm:px-4">
            <div className="container mx-auto flex max-w-6xl flex-wrap items-center justify-between">
              <a href="/Home" className="flex items-center">
                <span className="self-center whitespace-nowrap text-xl font-semibold">
                  GBC Park & Recreation
                </span>
              </a>
              <div className="mt-2 sm:mt-0 sm:flex md:order-2">
                <a
                  type="button"
                  href="/auth/sign-in"
                  className="rounde mr-3 hidden rounded-lg border border-blue-700 py-1.5 px-6 text-center text-sm font-medium text-blue-700 focus:outline-none focus:outline-none  focus:ring-4 md:inline-block"
                >
                  Login
                </a>
                <a
                  type="button"
                  href="/auth/sign-up"
                  className="rounde mr-3 hidden rounded-lg bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:outline-none  focus:ring-4 md:mr-0 md:inline-block"
                >
                  Register
                </a>
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
            className="flex-grow bg-cover bg-center py-32"
            style={{
              backgroundImage: `url(https://media.istockphoto.com/id/610051788/photo/toronto-skyline-view-from-island-park.jpg?b=1&s=170667a&w=0&k=20&c=Q1jVSiZXusql1lzF7aCqBMvsfoFhpknj4MBp2Nk5d3M=)`,
            }}
          >
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-xl rounded-lg bg-white p-8 opacity-90 shadow-md">
                <h2 className="mb-10 text-center text-5xl font-bold text-blue-700">
                  GBC Park & Recreation
                </h2>
                <p className="text-center text-gray-600">
                  Discover the best parks and recreation facilities in your area
                  and plan your next outdoor adventure!
                </p>
              </div>
            </div>
          </div>

          <div className="container mx-auto py-16 px-4">
            <h2 className="mb-10 text-center text-4xl font-bold">About Us</h2>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-2xl font-bold">For Park Goers</h3>
                <p className="text-gray-600">
                  The Park & Recreation web app is a one-stop-shop for
                  individuals who are looking for information on local parks and
                  recreation facilities. It provides a user-friendly interface
                  that allows individuals to quickly and efficiently access the
                  information they need, such as the location of the park,
                  amenities available, and upcoming events. This makes it easier
                  for people to plan their visits and make the most of their
                  leisure time.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-2xl font-bold">For Park Owners</h3>
                <p className="text-gray-600">
                  In addition to helping the general public, the Park &
                  Recreation web app also has a secondary goal of assisting park
                  owners. Many parks or recreation facilities may not have a
                  platform for providing information about their facilities, and
                  our web application aims to fill that gap. Park owners can use
                  our platform to edit or add information about their parks,
                  making it easier for people to find the information they need
                  and ultimately visit the park.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-2xl font-bold">
                  Continuous Improvement
                </h3>
                <p className="text-gray-600">
                  The Park & Recreation web app is constantly evolving and
                  improving to better serve the needs of both park owners and
                  the public. The web application includes tools for park owners
                  to update information about their parks, and for users to
                  provide feedback and ratings on parks and recreation
                  facilities they have visited. This allows the company to
                  gather valuable insights and identify areas for improvement,
                  leading to a better user experience.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-2xl font-bold">Our Mission</h3>
                <p className="text-gray-600">
                  In conclusion, the Park & Recreation web app is a valuable
                  resource for individuals looking for information on local
                  parks and recreation facilities, and for park owners who want
                  to provide information about their facilities to the public.
                  The platform is user-friendly, constantly evolving, and
                  designed to make it easier for people to find the information
                  they need and to plan their visits to the park. By providing
                  this information, the company hopes to enhance the public's
                  experience with their local parks and recreation facilities.
                </p>
              </div>
            </div>
          </div>
        </div>
        <footer className="bg-gray-900 p-10 text-center text-white">
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
