import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";

export function Park() {
  return (
   
    <>
 <section className="h-screen bg-cover relative">
  <img src="https://images.unsplash.com/photo-1619364726002-dfd4fdaee5f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"/>
  <div className="flex h-full w-full items-center justify-center container mx-auto px-8">
    <div className=" text-center absolute top-0 left-0 right-0 bottom-0 mt-10 bg-opacity-75">
      <h1 className="text-3xl sm:text-5xl capitalize tracking-widest text-white lg:text-7xl">Comming Soon</h1>

  
    </div>
  </div>
</section></>

  );
}

export default Park;
