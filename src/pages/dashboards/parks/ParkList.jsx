import React, { useState ,useEffect} from "react";

const parks = [
  
 { 
    "_id" : "akjsdhfkjasdf",
    "name": "Central Park",
    "clientId": "abc123",
    "address": "New York, NY",
    "description": "Central Park is an urban park in New York City",}
];

function ParkList(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [parksPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
  const [parklist,setparkList] = useState(parks)

  useEffect(() => {

    async function fetchData() {
    
      
      
      try {
        const response = await fetch(`http://localhost:3000/park/parkList`, {
          method: 'GET',
          mode: 'cors',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
       setparkList(data)
       
 
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredParks = parklist.filter((park) =>
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
                <a
                  type="button"
                  href="/auth/sign-in"
                  className="rounde mr-3 focus:outline-none hidden border border-blue-700 py-1.5 px-6 text-center text-sm font-medium text-blue-700 focus:outline-none focus:ring-4  md:inline-block rounded-lg"
                >
                  Login
                </a>
                <a
                  type="button"
                  href="/auth/sign-up"
                  className="rounde mr-3 focus:outline-none hidden bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  md:mr-0 md:inline-block rounded-lg"
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
                  className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-gray-700"
                 
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/ParkList"
                  className="block rounded py-2 pl-3 pr-4 md:text-blue-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                  aria-current="page"
                >
                  Park List
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="bg-white ml-40 mr-40 p-12 rounded-md  mx-auto mt-10">
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
              key={park._id}
              className="p-4 my-4 bg-white rounded-md shadow-md hover:shadow-lg"
            >
              <h3 className="text-gray-600 font-medium">{park.name}</h3>
              <p className="text-gray-500 text-xs">{park.address}</p>
              <a href={`/ParkInfo/${park._id}`}>
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
      <footer className="bg-gray-900 p-10 text-white text-center">
        <p>
          &copy; Copyright 2022, All Rights Reserved by George Brown Company
        </p>
        <p>General Information</p>
        <p>Phone:(807)938-6534</p>
        <p>Address:Box 730, 479 Government StreetDryden, ONP8N 2Z4</p>
      </footer>
    </div>
  );
}

export default ParkList;
