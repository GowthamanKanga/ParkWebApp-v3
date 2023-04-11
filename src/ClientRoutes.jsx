import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  
  
} from "@heroicons/react/24/solid";
import {Home, Profile, Settings, ViewBookings, ViewFeedback ,Park} from "@/pages/dashboards/client";
import { AiOutlineSetting  } from "react-icons/ai";
import { RiFeedbackLine } from "react-icons/ri";

import { BsFilesAlt } from "react-icons/bs";
import { SignIn,SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};
//  his names are for Side menu
 export const clientRoutes = [
  {
    layout: "client",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Home ",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Bookings",
        path: "/viewbookings",
        element: <ViewBookings />,
      },
      {
        icon: <AiOutlineSetting  size="25px" />,
        name: "settings",
        path: "/settings",
        element: <Settings />,
      },
      {
        icon: <RiFeedbackLine size="25px"/>,
        name: "Feedback",
        path: "/viewfeedback",
        element: <ViewFeedback />,
      },
      {
        icon: <BsFilesAlt  size="25px" />,
        name: "Park",
        path: "/park",
        element: <Park />,
      },
    ],
  },
  
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];





export default clientRoutes;
