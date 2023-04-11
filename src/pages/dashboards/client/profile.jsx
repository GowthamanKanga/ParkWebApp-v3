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
import ParkForm from "../client/EditParkPages/parkForm";
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


function ParkListModal({ showModal, toggleModal, clientId }) {

  const [parksData, setParks] = useState([
    { id: 1, name: "Park 1" },
    { id: 2, name: "Park 2" },
    { id: 3, name: "Park 3" },
    { id: 4, name: "Park 4" },
  ]);
  useEffect(() => {
console.log(clientId)
    async function fetchData() {
      try {
      // replace with the actual client ID
        const response = await fetch(`http://localhost:3000/park/parks/${clientId}`, {
          method: 'GET',
          mode: 'cors',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setParks(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={toggleModal}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div
          className="inline-block transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:align-middle"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 py-4 sm:px-6 sm:pb-4">
            <h3
              className="mb-4 text-lg font-medium leading-6 text-gray-900"
              id="modal-headline"
            >
              Parks (Client ID: {clientId})
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Park Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Park ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {parksData.map((park) => (
                    <tr key={park._id}>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">{park.name}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">{park._id}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                       
                        <a href={`/Client/EditHome/${park._id}`} className="ml-3 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
  Edit
</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="ml-3 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ParkFormModal({ showParkFormModal, toggleParkFormModal }) {
  if (!showParkFormModal) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          onClick={toggleParkFormModal}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div
          className="inline-block transform transition-all sm:w-full sm:max-w-md sm:align-middle"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="overflow-hidden rounded-lg bg-white shadow-xl">
           
              <button
                type="button"
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                onClick={toggleParkFormModal}
              >
                <span className="text-xl font-bold">&times;</span>
              </button>
              <h3
                className="mb-4 mt-6 text-lg font-medium leading-6 text-gray-900"
                id="modal-headline"
              >
                New Park Form
              </h3>
              <div>
              <ParkForm onSubmitSuccess={toggleParkFormModal} />
              </div>
            </div>
          </div>
        </div>
      </div>
   
  );
}


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
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmitSuccess = () => {
    handleModalClose();
  };

  const [showModal, setShowModal] = useState(false);
  const [showParkFormModal, setShowParkFormModal] = useState(false);

  const toggleParkFormModal = () => {
    setShowParkFormModal(!showParkFormModal);
  };

  // const handleParkAction = (parkId, action) => {
  //   if (action === "edit") {
  //     window.location.href = "/client/EditHome";
  //   } else {
  //     // Handle other actions if necessary
  //   }
  // };



  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleParkAction = (parkId) => {
    
   // Get the history object from react-router-dom
  const history = History();

  // Construct the new URL with the client ID and park ID
  const url = `/client/edithomepage/${parkId}`;

  // Navigate to the new URL using history.push()
  history.push(url);
 
    
    toggleModal();
  };

  const userId =  localStorage.getItem("userId");
    
  const fetchData = async () => {
    try{fetch(`http://localhost:3000/client/profile/image/${userId}`)
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
        const res = await fetch(`http://localhost:3000/client/${userId}`, {
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
              navigate("../../auth/sign-up")("true")
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
    <ParkFormModal
        showParkFormModal={showParkFormModal}
        toggleParkFormModal={toggleParkFormModal}
      />

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
                 
                    className="mb-1 rounded bg-pink-500 px-4 py-2 text-s font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-pink-600 sm:mr-2"
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
                      10
                    </span>
                    <span className="text-blueGray-400 text-sm">WebSites</span>
                  </div>
                  <div className="p-3 text-center lg:mr-4">
                    <span className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide">
                      25
                    </span>
                    <span className="text-blueGray-400 text-sm">FeedBacks</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
            <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2 capitalize">
            {first_name +" " + last_name}
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
          
          {/* <div className="container mx-auto px-4">
            <body>
              <div class="rounded-t border-b bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 px-4 py-5 sm:px-6">
                <h3 class="text-lg font-medium leading-6 text-white">
                  Booking List
                </h3>
              </div>
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
          </div> */}
        </CardBody>
      </Card>
      <Card className="mx-3  mb-6 lg:mx-4">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="ml-5 flex items-center justify-between p-5 pl-10 pr-10"
        >
          <div>
            <Typography variant="h6" color="blue-gray" className="text-m mb-1">
              View My Park
            </Typography>
          </div>
          <button
            className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            onClick={toggleModal}
          >
            Show Parks
          </button>
          <ParkListModal
            showModal={showModal}
            toggleModal={toggleModal}
            clientId={userId}
          />
        </CardHeader>
      </Card>
      <Card className="mx-3  mb-6 lg:mx-4">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="ml-5 flex items-center justify-between p-5 pl-10 pr-10"
        >
          <div>
            <Typography variant="h6" color="blue-gray" className="text-m mb-1">
              Create My Park
            </Typography>
          </div>
          <button
            className="text-s mb-1 rounded bg-pink-500 px-4 py-2 font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-pink-600 sm:mr-2"
            type="button"
            onClick={toggleParkFormModal}
          >
            Create
          </button>
        </CardHeader>
      </Card>
    </>
  );
}

export default Profile;
