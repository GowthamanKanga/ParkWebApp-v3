import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";

import React from 'react';
import Rating from 'react-rating';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { useState } from "react";
import "tailwindcss/tailwind.css";
import { FaStar } from "react-icons/fa";


const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
};
export function FeedBack() {
  const [currentValue, setCurrentValue] = useState(0);
  const [park, setPark] = useState("");
  const [hoverValue, setHoverValue] = useState(0);
  const [email, setEmail] = useState("")
  const [feedback,setFeedback] =useState('')
  const [response, setResponse] = useState("");
  const [rating, setRating] = useState(0)
  const handleClick = (value) => {
    setCurrentValue(value);
  };

 
  const handleRating = (rate) => {
    setRating(rate)

    // other logic
  }
  const onSubmitFeedBack = async (event) => {
    event.preventDefault();
    const feedbackData = {
      email,
      feedback,
      park,
      rating
    
    };
    try {
      const res = await fetch("http://localhost:3000/feedback/add", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      if (res.status == 200) {
        setResponse("true");
        {
          setTimeout(() => {
            setResponse("false");
          }, 1500);
        }
      
      
      } else {
        const error = await res.json();

       
        setTimeout(() => {
          setMsg("");
          }, 1500);

      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div>

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
              Thank you for your kind feedback! 😇
            </div>
          </div>
        </div>
      )}

        <div className="   rounded-xl bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 text-white py-20">
          <div className="container mx-auto flex flex-col md:flex-row my-6 md:my-24">
            <div className="flex flex-col w-full lg:w-1/3 p-8">
              <p className="ml-6 text-cyan-200 text-lg uppercase tracking-loose">REVIEW</p>
              <p className="text-3xl md:text-5xl my-4 leading-relaxed md:leading-snug">Leave us a feedback!</p>
              <p className="text-sm md:text-base leading-snug text-gray-50 text-opacity-100">
                Please provide your valuable feedback and something something ...

              </p>
            </div>
            <div className="flex flex-col w-full lg:w-10/2 justify-center">
              <div className="container  px-4">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-6/12 px-4">
                    <div
                      className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white">
                      <div className="flex-auto p-5 lg:p-10">


                        <h4 className="text-2xl mb-4 text-black font-semibold">Have a suggestion?</h4>

                        <form id="feedbackForm" action="" method="">
                          <div className="relative w-full mb-3">
                            <label className="block uppercase text-gray-700 text-base font-bold mb-2"
                              for="email">Email</label>
                              <input
                               type="email" 
                               onChange={(e) => setEmail(e.target.value)}
                               name="email"
                               required=""
                   className="border-0 px-3 py-3 rounded text-base shadow w-full
                    bg-gray-300 placeholder-black text-gray-800 outline-none focus:bg-gray-400" placeholder=" "
                                />
                          </div>

                          <select
                            className="w-full py-2 px-3 text-gray-700  bg-gray-300 border border-gray-400 rounded-lg appearance-none focus:outline-none focus:shadow-outline"
                            label="Select Account"
                            name="park"
                            onChange={(e) => setPark(e.target.value)}
                          >
                            <option
                              className="text-gray-800 m-2 hover:bg-gray-200"
                              value=""
                            >Please select an account</option>
                            <option
                              class="text-gray-800   hover:bg-gray-100"
                              value="Bluffers Park"
                            >Bluffers Park</option>
                            <option
                              className="p-2 text-gray-800 "
                              value="Humberline Park"
                            >Humber Line park</option>
                            <option selected
                              className="p-2 text-gray-800 "
                              value="High park"
                            >High Park</option>
                          </select>
                          <div className="relative w-full mb-3">
                            <label className="block uppercase text-gray-700 text-base mt-2 font-bold mb-2"
                              for="message">Message</label>
                              <textarea 
                               type="text" 
                               onChange={(e) => setFeedback(e.target.value)}
                            
                              maxlength="300" name="feedback" id="feedback" rows="4"
                                cols="80"
                                className="border-0 px-3 py-3 bg-gray-300 placeholder-black text-gray-800 rounded text-sm shadow focus:outline-none w-full"
                                placeholder="" required></textarea>
                          </div>
                          <div className="flex p-2">
                            <p className="text-4xl text-gray-800 ">{rating + ".0"} </p> 
                             <Rating className="text-4xl text-yellow-800 ml-2 rounded"
                              initialRating={rating}
                              onClick={(value) => handleRating(value)}
                              fullSymbol={<FontAwesomeIcon icon={fullStar} />}
                              emptySymbol={<FontAwesomeIcon icon={emptyStar} />}
                            /></div>







                          <div className="text-center mt-6">
                            <button id="feedbackBtn"
                            onClick={onSubmitFeedBack}
                              className="bg-blue-400 text-white text-center mx-auto active:bg-yellow-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                              type="submit">Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div></>




  )
}
export default FeedBack;
