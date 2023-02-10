import React, { useState } from "react";

const parks = [
  { name: "High Park", location: "Toronto, ON", id: 1 },
  { name: "Trinity Bellwoods Park", location: "Toronto, ON", id: 2 },
  { name: "Riverdale Park", location: "Toronto, ON", id: 3 },
  { name: "Guild Park and Gardens", location: "Toronto, ON", id: 4 },
  { name: "Centennial Park", location: "Toronto, ON", id: 5 },
  { name: "Cedarvale Park", location: "Toronto, ON", id: 6 },
  { name: "Rouge National Urban Park", location: "Toronto, ON", id: 7 },
  { name: "Tommy Thompson Park", location: "Toronto, ON", id: 8 },
  { name: "Grenadier Pond", location: "Toronto, ON", id: 9 },
  { name: "James Gardens", location: "Toronto, ON", id: 10 },
  { name: "Mimico Waterfront Park", location: "Toronto, ON", id: 11 },
];

function ParkList(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [parksPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredParks = parks.filter((park) =>
    park.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPark = currentPage * parksPerPage;
  const indexOfFirstPark = indexOfLastPark - parksPerPage;
  const currentParks = filteredParks.slice(indexOfFirstPark, indexOfLastPark);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredParks.length / parksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
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
      <div className="bg-white p-12 rounded-md w-full mx-auto mt-10">
        <div className="flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold">Park List</h2>
            <span className="text-xs">All Parks</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex bg-gray-50 items-center p-2 rounded-md">
              <input
                type="text"
                placeholder="Search Parks..."
                className="px-3 py-2 bg-gray-50 rounded-md w-64"
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          {currentParks.map((park) => (
            <div
              key={park.id}
              className="p-4 my-4 bg-white rounded-md shadow-md hover:shadow-lg"
            >
              <h3 className="text-gray-600 font-medium">{park.name}</h3>
              <p className="text-gray-500 text-xs">{park.location}</p>
              <a href='/ParkInfo'>
              <button className="float-right bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-none">
                View
              </button>
              </a>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <ul className="pagination flex justify-center">
            {pageNumbers.map((number) => (
              <li
                key={number}
                id={number}
                onClick={handleClick}
                className="inline-block mx-2 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-full"
              >
                {number}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ParkList;
