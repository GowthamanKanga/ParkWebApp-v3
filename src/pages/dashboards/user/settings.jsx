import React, { Component } from "react";
import { useCallback } from "react";
import { Avatar } from "@material-tailwind/react";
import { json, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FormData from 'form-data';

import axios from "axios";
export function Settings() {
  // reacct state
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
  const [about_me, setabout_me] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passErr, setPassErr] = useState("");
  const userId = localStorage.getItem("userId");
  const [fileName, setFileName] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const onChangeFile = e => {
    setFileName(e.target.files[0]);
  }
  const fetchData = async () => {


try{fetch(`http://localhost:3000/user/profile/image/${userId}`)
.then(response => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.blob();
})
.then(blob => {
  const  profileImg = URL.createObjectURL(blob)
  setImageUrl(profileImg)
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
      const res = await fetch(`http://localhost:3000/user/${userId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        method: "GET",
        mode: "cors",
      });
      if (res.status != 200) {
        //setTimeOut("true");

        {
          setTimeout(() => {
            Swal.fire({
              title: "Time out ",
              text: "Oops Something went Wrong Please Sign In Again! ",
              icon: "error",
              confirmButtonText: "ok",
            });
            navigate("../../auth/sign-in")("true");
          }, 1);
        }}
      
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
        about_me,
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

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();


    // const formData = new FormData();
    // formData.append("title",title)
    const userData = {
      first_name,
      last_name,
      gender,
      email,
      city,
      country,
      province,
      address,
      zip_code,
      about_me,

    };

    try {
      const res = await fetch(`http://localhost:3000/user/update/${userId}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(userData),
      });
      console.log(res);
      if (res.status == 200) {
        setResponse("true");
        {
          setTimeout(() => {
            setResponse("false");
          }, 1500);
        }
      }

      console.log(res.formData);
      // alert('Saved successfully.');
    } catch (err) {
      console.log(err.message);
    }
  };
  const updateImg = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append("profileImage", fileName)

console.log(formData)
    try {
      const res = await fetch(`http://localhost:3000/user/update/profileimg/${userId}`, {
        method: "PUT",
       
        body: formData
      });
      console.log(res);
      if (res.status == 200) {
        setResponse("true");
        {
          setTimeout(() => {
            setResponse("false");
          }, 1500);
        }
      }

      console.log(res.formData);
      // alert('Saved successfully.');
    } catch (err) {
      console.log(err.message);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    const userData = {
      password,
      currentPassword,
    };

    try {
      const res = await fetch(
        `http://localhost:3000/user/updatePassword/${userId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(userData),
        }
      );
      console.log(res);

      if (res.status == 200) {
        setResponse("true");
        {
          setTimeout(() => {
            setResponse("false");
          }, 1500);
        }
      } else if (res.status == 500) {
        setPassErr("true");
        {
          setTimeout(() => {
            setPassErr("false");
          }, 1500);
        }
      }

      console.log(res);
      // alert('Saved successfully.');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      {response == "true" && (
        <div className="flex rounded-md bg-green-100 p-3">
          <svg
            className="mr-2 h-8 w-8 flex-shrink-0 stroke-current stroke-2 text-green-600"
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0h24v24H0z" stroke="none" />
            <circle cx="12" cy="12" r="9" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <div className="text-green-700">
            <div className="text-xl font-bold">
              Your settings has been saved!
            </div>
          </div>
        </div>
      )}

      <div className="flex min-h-screen items-center justify-center rounded-xl bg-gray-100  p-6">
        <div className="max-w-screen- container mx-auto rounded-xl">
          <div>
        
           
              <div  class="   grid  m-10  place-content-center ">
              <form  onSubmit={updateImg} encType="multipart/form-data">
                <label for="img">
                {imageUrl ? (
                  <img
                  class="rounded-full w-36 h-36" 
                  src ={imageUrl}
                  // src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  alt="avatar"

                  />
                ) : (
                  <p>Loading...</p>
                )}
                

                <label class="block mb-2  ml-5 mt-2 text-base font-medium text-gray-900 dark:text-white" htmlFor="file">Upload Picture</label>
<input fileName ="profileImage"
onChange={onChangeFile}
class="block invisible w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" name="img" id="img"  aria-describedby="file_input_help" type="file" />
</label><button type="submit" 
className="rounded ml-5 bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
                            Update Pic
                          </button>
</form>
              </div>
              <form onSubmit={handleSubmit}>
              <div className="mb-6 rounded-xl bg-white p-4 px-4 shadow-lg md:p-8">
                <div className="grid grid-cols-2 gap-4 gap-y-2 text-sm lg:grid-cols-3">
                  <div className="lg:col-span-4">
                    <div className="grid grid-cols-1 gap-4 gap-y-2 text-sm md:grid-cols-5">
                      <div className="md:col-span-3">
                        <label
                          className="m-2 block text-base font-bold uppercase text-gray-700"
                          for="first_name"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          name="first_name"
                          id="first_name"
                          required
                          value={first_name}
                          onChange={(e) => setfirst_name(e.target.value)}
                          className="m-2 block h-10  w-full rounded border bg-gray-50  p-2 px-4 font-sans text-base text-gray-700"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label
                          className="m-2 block text-base font-bold uppercase text-gray-700"
                          for="last_name"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          required
                          name="last_name"
                          id="last_name"
                          value={last_name}
                          onChange={(e) => setlast_name(e.target.value)}
                          className="m-2 block h-10  w-full rounded border bg-gray-50  p-2 px-4 font-sans text-base text-gray-700"
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label
                          className="m-2 block text-base font-bold uppercase text-gray-700"
                          for="email"
                        >
                          Email Address
                        </label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          required
                          value={email}
                          onChange={(e) => setUserEmail(e.target.value)}
                          className="m-2 h-10 w-full    rounded border  bg-gray-50 px-4 font-sans text-base text-gray-700"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label
                          className="m-2 block text-base font-bold uppercase text-gray-700"
                          for="address"
                        >
                          Address / Street
                        </label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          value={address}
                          onChange={(e) => setaddress(e.target.value)}
                          className="m-2 block h-10  w-full rounded border bg-gray-50  p-2 px-4 font-sans text-base text-gray-700"
                          placeholder=""
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label
                          className="m-2 block text-base font-bold uppercase text-gray-700"
                          for="city"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          value={city}
                          onChange={(e) => setcity(e.target.value)}
                          className="m-2 block h-10  w-full rounded border bg-gray-50  p-2 px-4 font-sans text-base text-gray-700"
                          placeholder=""
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label
                          className="m-2 block text-base font-bold uppercase text-gray-700"
                          for="country"
                        >
                          Country / region
                        </label>
                        <div className="  flex h-10 items-center ">
                          <input
                            name="country"
                            id="country"
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setcountry(e.target.value)}
                            className="m-2 h-10 w-full    rounded border  bg-gray-50 px-4 font-sans text-base text-gray-700"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label
                          className="m-2 block text-base font-bold uppercase text-gray-700"
                          for="state"
                        >
                          State / province
                        </label>
                        <div className=" flex h-10 items-center  ">
                          <input
                            name="state"
                            id="state"
                            value={province}
                            onChange={(e) => setprovince(e.target.value)}
                            placeholder="State"
                            className="m-2  h-10  w-full rounded border bg-gray-50  p-2 px-4 font-sans text-base text-gray-700"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-1">
                        <label
                          className="m-2 block text-base font-bold uppercase text-gray-700"
                          for="zipcode"
                        >
                          Zipcode
                        </label>
                        <input
                          type="text"
                          name="zipcode"
                          id="zipcode"
                          value={zip_code}
                          onChange={(e) => setzip_code(e.target.value)}
                          className="m-2 block h-10  w-full rounded border bg-gray-50  p-2 px-4 font-sans text-base text-gray-700"
                          placeholder="M8EHJ5"
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label
                          className="m-2 block text-base font-bold uppercase text-gray-700"
                          for="email"
                        >
                          About Me
                        </label>
                        <textarea
                          type="text"
                          name="about_me"
                          id="about_me"
                          required
                          value={about_me}
                          onChange={(e) => setabout_me(e.target.value)}
                          className="m-2 block h-10  w-full rounded border bg-gray-50  p-2 px-4 font-sans text-base text-gray-700"
                        />
                      </div>

                      <div className="text-right md:col-span-5">
                        <div className="inline-flex items-end">
                          <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-4 md:gap-6">
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form action="#" method="POST">
                  <div className="overflow-hidden   rounded-2xl shadow-lg sm:rounded-md">
                    <div className="space-y-6 rounded-xl bg-white px-4 py-5 sm:p-6">
                      <div className="flex justify-center space-y-6 rounded-xl bg-white px-3 py-4 sm:p-6">
                        <div className="px-2 sm:px-0">
                          <h3 className=" block p-2  text-center text-lg font-bold uppercase text-gray-700 ">
                            Notifications
                          </h3>
                        </div>
                      </div>

                      <fieldset>
                        {/* {<div
                        className="ml-3  justify-center text-lg   text-gray-700 dark:text-gray-800"
                        aria-hidden="true"
                      >
                        By Email
                      </div>} */}
                        <div className="mt-4 space-y-4">
                          <div className="flex items-start">
                            <label className="relative inline-flex cursor-pointer items-center">
                              <input
                                type="checkbox"
                                value=""
                                className="peer sr-only"
                              />
                              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                              <span className="ml-3 text-lg text-lg text-gray-700 ">
                                {" "}
                                Event Notification
                              </span>
                            </label>
                          </div>
                          <div className="flex items-start">
                            <label className="relative inline-flex cursor-pointer items-center">
                              <input
                                type="checkbox"
                                value=""
                                className="peer sr-only"
                              />
                              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                              <span className="ml-3 text-lg text-lg text-gray-700 ">
                                {" "}
                                News Letter Notification
                              </span>
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={changePassword}>
                  <div className="overflow-hidden  rounded-2xl shadow-lg sm:rounded-md">
                    <div className="ounded-2xl   space-y-6 bg-white px-4 py-5 sm:p-6">
                      <div className="flex justify-center space-y-6 rounded-xl bg-white px-4 py-5 sm:p-6">
                        <div className="">
                          <div className="px-4 sm:px-0">
                            <h3 className="m-2 block text-lg font-bold uppercase text-gray-700">
                              Password Infomation
                            </h3>
                          </div>
                        </div>
                      </div>
                      <fieldset>
                        <div className="md:gap-50 md:grid md:grid-cols-3">
                          <label
                            className=" text-lg font-bold tracking-wide  text-gray-700 dark:text-gray-700"
                            for="currentPassword"
                          >
                            Current password
                          </label>

                          <div className="mr-20  mb-5 md:col-span-3 ">
                            <input
                              type="password"
                              name="currentPassword"
                              id="currentPassword"
                              value={currentPassword}
                              onChange={(e) =>
                                setCurrentPassword(e.target.value)
                              }
                              className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                              placeholder="••••••••••••••••"
                            />
                            {passErr == "true" && (
                              <span className="text-red-600">
                                {" "}
                                Invalid Current Password
                              </span>
                            )}
                          </div>

                          <label
                            className=" text-lg font-bold tracking-wide  text-gray-700 dark:text-gray-700"
                            for="password"
                          >
                            New password
                          </label>
                          <div className="mr-20  mb-5 md:col-span-3">
                            <input
                              type="password"
                              name="password"
                              id="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                              placeholder="••••••••••••••••"
                            />
                          </div>
                          <label
                            className=" text-lg font-bold tracking-wide  text-gray-700 dark:text-gray-700"
                            for="confirmNewPass"
                          >
                            Confirm Password
                          </label>
                          <div className="mr-20  mb-5 md:col-span-3">
                            <input
                              type="password"
                              name="confirmNewPass"
                              id="confirmNewPass"
                              value={confirmPass}
                              onChange={(e) => setConfirmPass(e.target.value)}
                              className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                              placeholder="••••••••••••••••"
                            />
                            {password !== confirmPass && (
                              <span className="text-red-600">
                                {" "}
                                Password does not match{" "}
                              </span>
                            )}
                          </div>

                          <h2></h2>
                        </div>
                        <div className="px-4 sm:px-0">
                          <h3 className="text-mid font-medium leading-6 text-gray-900">
                            {" "}
                            Password requirements:
                          </h3>
                          <h3 className="text-mid font-medium leading-6 text-gray-400">
                            Ensure that these requirements are met:
                          </h3>
                          <h4 className="text-mid font-sm leading-6 text-gray-400">
                            At least 10 characters (and up to 100 characters)
                          </h4>
                          <h4 className="text-mid font-sm leading-6 text-gray-400">
                            At least one lowercase character
                          </h4>
                          <h4 className="text-mid font-sm leading-6 text-gray-400">
                            Inclusion of at least one special character, e.g., !
                            @ # ?
                          </h4>
                        </div>
                      </fieldset>
                    </div>

                    <div className="bg-gray-50 px-4 py-1 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
