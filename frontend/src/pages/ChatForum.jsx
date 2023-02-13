import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

const mockData = [
  {
    title: "Post 1",
    description: "This is the first post",
    username: "User 1",
    date: "Jan 1, 2021",
    image: "https://via.placeholder.com/50x50",
  },
  {
    title: "Post 2",
    description: "This is the second post",
    username: "User 2",
    date: "Jan 2, 2021",
    image: "https://via.placeholder.com/50x50",
  },
  {
    title: "Post 3",
    description: "This is the third post",
    username: "User 3",
    date: "Jan 3, 2021",
    image: "https://via.placeholder.com/50x50",
  },
];

function ChatForum() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setPosts(mockData);

    const socket = socketIOClient("http://localhost:5501");
    socket.on("new-post", (post) => {
      setPosts([...posts, post]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      title: message,
      description: message,
      username: "User 4",
      date: new Date().toLocaleString(),
      image: "https://via.placeholder.com/50x50",
    };

    setPosts([...posts, post]);
    setMessage("");

    const socket = socketIOClient("http://localhost:5501");
    socket.emit("new-post", post);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchText.toLowerCase()) ||
      post.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const pageSize = 3;
  const pageCount = Math.ceil(filteredPosts.length / pageSize);
  const currentPosts = filteredPosts.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return (
    <div>
      <body className="bg-white">
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
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
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

        <div className="pt-32  bg-white">
          <h1 className="text-center text-2xl font-bold text-gray-800">
           Chat Forum
          </h1>
        </div>

        <div className="flex flex-wrap items-center  overflow-x-auto overflow-y-hidden py-10 justify-center   bg-white text-gray-800">
          <a
            rel="noopener noreferrer"
            href="/ParkInfo"
            className="flex items-center flex-shrink-0 px-5 py-3 space-x-2text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-4 h-4"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>Park Info</span>
          </a>
          <a
            rel="noopener noreferrer"
            href="/FacilityList"
            className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 rounded-t-lg text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-4 h-4"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            <span>Facilities</span>
          </a>
          <a
            rel="noopener noreferrer"
            href="/BookingPage"
            className="flex items-center flex-shrink-0 px-5 py-3 space-x-2  text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-4 h-4"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>Booking</span>
          </a>
          <a
            rel="noopener noreferrer"
            href="EventList"
            className="flex items-center flex-shrink-0 px-5 py-3 space-x-2  text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-4 h-4"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
            </svg>
            <a>Event</a>
          </a>
          <a
            rel="noopener noreferrer"
            href="/ChatForum"
            className="flex items-center flex-shrink-0 px-5 py-3 space-x-2  text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-4 h-4"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
            </svg>
            <span>Chat Forum</span>
          </a>
          <a
            rel="noopener noreferrer"
            href="/ParkMap"
            className="flex items-center flex-shrink-0 px-5 py-3 space-x-2  text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-4 h-4"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
            </svg>
            <span>Map</span>
          </a>
        </div>
      </body>
      <div className="flex justify-center h-screen">
        <div className="w-1/2">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full p-2 border border-gray-400"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <main className="flex-1 overflow-y-scroll p-4">
            {currentPosts.map((post, index) => (
              <div
                key={index}
                className="border border-gray-400 rounded p-4 mb-4"
              >
                <div className="flex">
                  <img src={post.image} alt="User avatar" />
                  <div className="ml-4">
                    <h3 className="text-lg">{post.title}</h3>
                    <p className="text-gray-600">{post.description}</p>
                    <p className="text-gray-600">
                      by {post.username} on {post.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </main>
          <div className="flex justify-between mt-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Prev
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage + 1 === pageCount}
            >
              Next
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Add a new post..."
                className="w-full p-2 border border-gray-400"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              Add post
            </button>
          </form>
        </div>
      </div>
      <footer className="bg-gray-900 p-10 text-white text-center">
  <p>&copy; Copyright 2022, All Rights Reserved by George Brown Company</p>
  <p>General Information</p>
  <p>Phone:(807)938-6534</p>
  <p>Address:Box 730, 479 Government StreetDryden, ONP8N 2Z4</p>
</footer>
    </div>
  );
}

export default ChatForum;
