import React from "react";
import centreIslandPier from "../images/centre-island-pier.png";

const EditHome = () => {
  return (
    <>
      <div
        className="bg-cover bg-center h-64 w-full"
        style={{ backgroundImage: `url(${centreIslandPier})` }}
      >
        <div className="container mx-auto h-full flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold leading-tight">
            Toronto Island Park
          </h1>
        </div>
      </div>
      <div className="container mx-auto p-10">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 p-10">
            <div className="bg-white p-10 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-5">About Us</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                The Toronto Islands provide a great, refreshing escape from
                downtown with a beautiful view of Lake Ontario on one side, and
                the city skyline on the other. The park offers a range of
                activities, including biking, picnicking, and beach-going. It's
                the perfect place to relax and enjoy the sunshine on a hot
                summer day, or take in the stunning views of the city and lake
                in the evening. Whether you're a local or just visiting, Toronto
                Island Park is definitely worth checking out.
              </p>
              <h3 className="text-xl font-bold mb-5 mt-10">
                Events & Programs
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                The Toronto Islands host a variety of events and programs
                throughout the year, including festivals, concerts, and outdoor
                movies. There are also nature programs and walks available,
                allowing visitors to learn more about the island's diverse
                ecosystem. If you're looking for something to do, be sure to
                check out the calendar of events on the park's website for more
                information.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-5">
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-3">Park Information</h2>
              <p className="text-gray-600 text-md mb-2">
                First/Lost Children/Lost Parent
              </p>
              <p className="text-gray-600 text-md mb-2">
                Station Lost and Found
              </p>
              <p className="text-gray-600 text-md mb-2">Centre Island</p>
              <p className="text-gray-600 text-md mb-2">Near the ferry dock</p>
              <p className="text-gray-600 text-md mb-2">May to September</p>
              <h3 className="text-lg font-bold mb-2">Operating Hours</h3>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2">Day</th>
                    <th className="text-left p-2">Hours</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-left p-2">Monday</td>
                    <td className="text-left p-2">10:30 am to 5:30 pm</td>
                  </tr>
                  <tr>
                    <td className="text-left p-2">Tuesday</td>
                    <td className="text-left p-2">10:30 am to 5:30 pm</td>
                  </tr>
                  <tr>
                    <td className="text-left p-2">Wednesday</td>
                    <td className="text-left p-2">10:30 am to 5:30 pm</td>
                  </tr>
                  <tr>
                    <td className="text-left p-2">Thursday</td>
                    <td className="text-left p-2">10:30 am to 5:30 pm</td>
                  </tr>
                  <tr>
                    <td className="text-left p-2">Friday</td>
                    <td className="text-left p-2">10:30 am to 5:30 pm</td>
                  </tr>
                  <tr>
                    <td className="text-left p-2">Saturday</td>
                    <td className="text-left p-2">10:30 am to 5:30 pm</td>
                  </tr>
                  <tr>
                    <td className="text-left p-2">Sunday</td>
                    <td className="text-left p-2">10:30 am to 5:30 pm</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-gray-600 text-md mb-5 mt-3">
                Some wheelchairs are available to use .
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full p-10">
            <div className="bg-white p-10 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-5">Location</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                Toronto Island Park is located in Toronto, Ontario, Canada. It
                is accessible by ferry from the mainland and is a popular
                destination for locals and tourists alike. The park is a short
                ferry ride from the heart of the city and offers a relaxing
                escape from the hustle and bustle of downtown.
              </p>
            </div>
          </div>
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
    </>
  );
};
export default EditHome;