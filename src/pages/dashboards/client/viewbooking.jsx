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
  import { useCallback } from "react";

import { json, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
  import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
  import { authorsTableData, projectsTableData } from "@/data";
  
  export function ViewBookings() {
    const [feedbacks,setFeedBacks]= useState("")

   
   
    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
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
      </div>
    );
  }
  
  export default ViewBookings;
  