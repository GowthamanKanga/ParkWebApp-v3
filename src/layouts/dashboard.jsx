import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import { useCallback } from "react";
import { Avatar } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import {userRoutes} from "@/UserRoutes";
 import {clientRoutes} from "@/ClientRoutes";
 import {adminRoutes} from "@/AdminRoutes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";

export function Dashboard() {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);
  const[profileName,setProfileName] =useState("")
  const[role,setRole] = useState("")

  useEffect(() => {
    const role = localStorage.getItem("role");
     setRole(role)
    if (role === "user") {
      setProfileName("User Profile")
      setRoutes(userRoutes);
    } else if (role === "admin") {
      setProfileName("Admin Profile")
      setRoutes(adminRoutes);
    } else if (role === "client") {
      setProfileName("Client Profile")
      setRoutes(clientRoutes);
    }
  }, []);

  if (routes.length === 0) {
    return null;
  }


  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
 console.log(routes)

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
      
        routes={routes}
        brandName={profileName}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>

          {// TO change the Pages which you want to show on page
}
          {routes.map(
            ({ layout, pages }) =>
              layout === role  &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
       
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
