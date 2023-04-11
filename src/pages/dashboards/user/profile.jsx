import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import React, { Component } from "react";
import { useCallback } from "react";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";

export function Profile() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("../settings");
    console.log("hello");
  }
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setUserEmail] = useState("");
  const [gender, setgender] = useState("");

  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [country, setcountry] = useState("");
  const [province, setprovince] = useState("");
  const [zip_code, setzip_code] = useState("");
  const [response, setResponse] = useState("");
  const [timeOut, setTimeOut] = useState("");
  const [showBooking, setShowBooking] = useState("");
  const [profileImg, setprofileImg] = useState(null);
  const [about_me,setabout_me] = useState("")
  const onhandleClose = () => setShowBooking(false);
  console.log(showBooking);
  const userId = localStorage.getItem("userId");

  const fetchData = async () => {
    try {
      fetch(`http://localhost:3000/user/profile/image/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.blob();
        })
        .then((blob) => {
          const profileImg = URL.createObjectURL(blob);
          setprofileImg(profileImg);
          console.log(profileImg);
          // Use the image URL here
        })
        .catch((error) => {
          console.error(`An error occurred: ${error}`);
        });
    } catch (err) {
      console.log(err.message);
    }
    try {
      const res = await fetch(`http://localhost:3000/user/${userId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        method: "GET",
        mode: "cors",
      });
      if (res.status != 200) {
        setTimeOut("true");

        {  setTimeout(() => {
          Swal.fire({
            title: "Time out ",
            text: "Login Time Out ! Login Again",
            icon: "error",
            confirmButtonText: "ok",
          });
          navigate("../../auth/sign-up")("true")
           ("false") ;
        }, 1)}
      }
      const resp = await res.json();
      console.log(resp);

      const {
        first_name,
        last_name,
        gender,
        email,
        address,
        city,
        country,
        province,
        zip_code,
        about_me
      } = resp;
      setfirst_name(first_name);
      setlast_name(last_name);
      setgender(gender);
      setUserEmail(email);
      setaddress(address);
      setcity(city);
      setcountry(country);
      setprovince(province);
      setzip_code(zip_code);
      setabout_me(about_me);
    } catch (err) {
      console.log(err.message);
    }
  };

  const callback = useCallback(() => fetchData(), [userId]);

  useEffect(() => {
    callback();
  }, [callback]);
  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
             

               <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                <div className="relative">
                {profileImg ? (
                <img
                class="rounded-full w-36 h-36" 
                src ={profileImg}
                // src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="avatar"
              
              />
                ) : (
                  <img
                  class="rounded-full w-36 h-36" 
                 
                  src="../../../data/b.jpg"
                  alt="avatar"
                
                />
                )}
                  
                </div>
              </div> 
              <div className="w-full px-4 lg:order-3 lg:w-4/12 lg:self-center lg:text-right">
                <div className="mt-32 py-6 px-3 sm:mt-0">
                  <button
                    className="mb-1 rounded bg-pink-500 px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-pink-600 sm:mr-2"
                    type="button"
                    onClick={handleClick}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
              <div className="w-full px-4 lg:order-1 lg:w-4/12">
                <div className="flex justify-center py-4 pt-8 lg:pt-4">
                  <div className="mr-4 p-3 text-center">
                    <span className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide">
                      22
                    </span>
                    <span className="text-blueGray-400 text-sm">Friends</span>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <span className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide">
                      10
                    </span>
                    <span className="text-blueGray-400 text-sm">Photos</span>
                  </div>
                  <div className="p-3 text-center lg:mr-4">
                    <span className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide">
                      89
                    </span>
                    <span className="text-blueGray-400 text-sm">Comments</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center">
              <h3 className="text-blueGray-700 mb-2 mb-2 text-4xl font-semibold capitalize leading-normal">
                {first_name + " " + last_name}
              </h3>
              {address && city && province  ? (
                              <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">

                              <h6> <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                               {address + ", " + city+  ", "}</h6>
                              { province+", " +zip_code+ ", " +country}
                            </div>
                ) : (
                  <p>...</p>
                )}
           
              <div className="text-blueGray-600 mb-2 mt-10 uppercase underline">
                <i className="fas fa-briefcase text-blueGray-400 mr-2 text-lg"></i>
                {email}
              </div>
              <div className="text-blueGray-600 mb-2">
                <i className="fas fa-university text-blueGray-400 mr-2 text-lg"></i>
                University of Computer Science
              </div>
            </div>
            <div className="border-blueGray-200 mt-10 border-t py-10 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 lg:w-9/12">
                {about_me   ? (
                              <p className="text-blueGray-700 mb-4 text-lg leading-relaxed">
                              {about_me}
                            </p>
                ) : (
                  <p>Hello my name is {first_name + " " + last_name}</p>
                )}
                </div>
              </div>
            </div>
          </div>
          <Card>
          <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              All Bookings
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
              <div className="container mx-auto px-4">
            <body>
              
              <div class="overflow-hidden bg-white shadow sm:rounded-md">
                <ul class="divide-y divide-gray-200">
                  <li>
                    <a class="block hover:bg-gray-50">
                      <div class="px-4 py-4 sm:px-6">
                        <div class="flex items-center justify-between">
                          <p class="truncate text-sm font-thin text-gray-700">
                            Increase sales by 10% year over year
                          </p>

                          <button
                            onClick={() => setShowBooking(true)}
                            class="rounded-full  bg-gray-100     py-2 px-4 font-semibold outline-none hover:bg-gray-200  focus:outline-none"
                          >
                            View Details
                          </button>
                        </div>
                        <div class="mt-2 sm:flex sm:justify-between">
                          <div class="sm:flex">
                            <p class="flex items-center text-sm font-light text-gray-500">
                              <time datetime="2020-01-07">January 7, 2020</time>
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li>
                    <a class="block hover:bg-gray-50">
                      <div class="px-4 py-4 sm:px-6">
                        <div class="flex items-center justify-between">
                          <p class="truncate text-sm font-thin text-gray-700">
                            Increase newsletter subscribers by 500
                          </p>

                          <button class="rounded-full  bg-gray-100   py-2 px-4 font-semibold outline-none hover:bg-gray-200  focus:outline-none">
                            View Details
                          </button>
                        </div>
                        <div class="mt-2 sm:flex sm:justify-between">
                          <div class="sm:flex">
                            <p class="flex items-center text-sm font-light text-gray-500">
                              <time datetime="2020-01-07">January 7, 2020</time>
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li>
                    <a class="block hover:bg-gray-50">
                      <div class="px-4 py-4 sm:px-6">
                        <div class="flex items-center justify-between">
                          <p class="truncate text-sm font-thin text-gray-700">
                            Increase customer satisfaction rating by 10 points
                          </p>

                          <button class="rounded-full  bg-gray-100  py-2 px-4 font-semibold outline-none hover:bg-gray-200  focus:outline-none">
                            View Details
                          </button>
                        </div>
                        <div class="mt-2 sm:flex sm:justify-between">
                          <div class="sm:flex">
                            <p class="flex items-center text-sm font-light text-gray-500">
                              <time datetime="2020-01-07">January 7, 2020</time>
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </body>
          </div>
              </thead>
            
            </table>
          </CardBody>
        </Card>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
