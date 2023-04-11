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
  import Rating from 'react-rating';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
  import { authorsTableData, projectsTableData } from "@/data";
  import { useCallback } from "react";

  import { json, useParams } from "react-router-dom";
  import { useEffect, useState } from "react";
    
  export function ViewFeedback() {
    const [feedbacks,setFeedBacks]= useState([])
  

    
    
      const fetchData = async () => {
        try {
          const res = await fetch(`http://localhost:3000/feedback/view`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
            method: "GET",
            mode: "cors",
          });
          const resp = await res.json();
          setFeedBacks(resp);
          console.log(resp)
        } catch (err) {
          console.log(err.message);
        }
      };
    
      const callback = useCallback(() => fetchData(), []);
      useEffect(() => {
        callback();
      }, [callback]);
    
    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              All Feedbacks
            </Typography>
          </CardHeader>
          <CardBody className=" px-0 pt-0 pb-2">
          
      {feedbacks.map((feedback) => (
        <div key={feedback._id}>
  
    <div className="flex justify-center">
      <div className="max-w-3xl">
        <div className="block p-6 rounded-lg shadow-lg bg-white m-4">
          <div className="md:flex md:flex-row">
            <div
              className="md:w-96 w-36 flex justify-center items-center mb-6 lg:mb-0 mx-auto md:mx-0"
            >
              <img
                src="https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg"
                className="rounded-full shadow-md"
                alt="woman avatar"
              />
            </div>
            <div className="md:ml-8 p-5 mb-2">
              <h2>{feedback.email}</h2>
              <p className="text-gray-500 font-light mb-6">
                {feedback.feedback}
                {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id quam sapiente
                molestiae numquam quas, voluptates omnis nulla ea odio quia similique corrupti
                magnam. */}
              </p>
              <Rating className="text-4xl text-yellow-800 ml-2 rounded"
                              initialRating={feedback.rating}
                            readonly
                              fullSymbol={<FontAwesomeIcon icon={fullStar} />}
                              emptySymbol={<FontAwesomeIcon icon={emptyStar} />}
                            />
        </div>
            </div>
            
          </div>
        </div>
      </div>
      </div>
   ))}
      
  
           
          </CardBody>
        </Card>
      </div>
    
    
    );
  }
  
  export default ViewFeedback;
    {/* <div>
        <h1>adsfjhk</h1>
      {feedbacks.map((feedback) => (
        <div key={feedback._id}>
          <p>{feedback.email}</p>
        </div>
      ))}
    </div>
    </> */}