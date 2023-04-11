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
import React, { Component } from 'react'
import { useCallback } from 'react';

import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
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
    console.log("hello")
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
  const [response,setResponse] = useState("");
  const [timeOut,setTimeOut] = useState("");
  const [showBooking,setShowBooking] = useState("")
  const [profileImg, setprofileImg] = useState(null);
  const [about_me,setabout_me] = useState("")
const onhandleClose  = () => setShowBooking(false)
console.log(showBooking)
  const userId =  localStorage.getItem("userId");
    
  const fetchData = async () => {
    try{fetch(`http://localhost:3000/admin/profile/image/${userId}`)
.then(response => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.blob();
})
.then(blob => {
  const  profileImg = URL.createObjectURL(blob)
  setprofileImg(profileImg)
  console.log(profileImg)
  // Use the image URL here
})
.catch(error => {
  console.error(`An error occurred: ${error}`);
});




}catch (err) {
  console.log(err.message);
}
    try {
        const res = await fetch(`http://localhost:3000/admin/${userId}`, {
            headers: {
                "Authorization": localStorage.getItem("token"),
            },
            method: "GET",
            mode: "cors"
        });
       if(res.status != 200){
        
setTimeOut("true");
  
            {  setTimeout(() => {
              Swal.fire({
                title: "Time out ",
                text: "Login Time Out ! Login Again",
                icon: "error",
                confirmButtonText: "ok",
              });
              navigate("../../auth/sign-in")("true")
               ("false") ;
            }, 1)}

         
          

       }
        const resp = await res.json();
        console.log(resp)
        
        const {first_name, last_name, gender, email, address, city, country, province, zip_code,about_me} = resp;
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

const callback = useCallback(() => fetchData(),[userId]);


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
                    onClick={handleClick }
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
            <div className="text-center mt-12">
            <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2 capitalize">
            {first_name +" " + last_name}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              
              <h6> <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
               {address + ", " + city+  ", "}</h6>
              { province+", " +zip_code+ ", " +country}
            </div>
            <div className="mb-2 text-blueGray-600 mt-10 underline uppercase">
              <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400" ></i>{email}
            </div>
            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>University of Computer Science
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
        
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
