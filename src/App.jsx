import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { RequireAuth } from "react-auth-kit";
import EditHome from "./pages/dashboards/client/EditParkPages/EditHome";
import ClientEventList from "./pages/dashboards/client/EditParkPages/ClientEventList";
import ClientFacilityList from "./pages/dashboards/client/EditParkPages/ClientFacilityList";
import  Home  from "./pages/dashboards/parks/Home";
import ParkList from "./pages/dashboards/parks/ParkList";

import HomePark from "./pages/dashboards/parks/ParkInfo";
import ParkMap from "./pages/dashboards/parks/ParkMap";
import BookingPage from "./pages/dashboards/parks/newBookingPage";
import ChatForum from "./pages/dashboards/parks/ChatForum";
import ParkInfo from "./pages/dashboards/parks/ParkInfo";
import DeniedForm from "./pages/dashboards/parks/DeniedForm";
import EventList from "./pages/dashboards/parks/EventList";
import FacilityList from "./pages/dashboards/parks/FacilityList";
function App() {
  return (
    <Routes>
      <Route path="/auth/*" element={<Auth />} />

      <Route path="/client/EditHome/:parkId" element={<EditHome />} />
      <Route
        path="/client/EditFacilityList/:parkId"
        element={<ClientFacilityList />}
      />
      <Route
        path="/client/ClientEventList/:parkId"
        element={<ClientEventList />}
      />
      {/* } />
          <Route path="/ClientEventList" element={<ClientEventList />} />
          <Route path="/ClientMap" element={<ClientMap />} /> */}
      <Route
        path="/user/*"
        element={
          <RequireAuth loginPath={"/auth/sign-in"}>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/*"
        element={
          <RequireAuth loginPath={"/auth/sign-in"}>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/client/*"
        element={
          <RequireAuth loginPath={"/auth/sign-in"}>
            <Dashboard />
          </RequireAuth>
        }
      />
          <Route path="/Home" element={<Home />} />
          <Route path="/ParkList" element={<ParkList />} />
           <Route path="/ParkInfo/:parkId" element={<HomePark />} />
           <Route path="/FacilityList/:parkId" element={<FacilityList />}/>
              <Route path="/EventList/:parkId" element={<EventList />} />
              <Route path="/BookingPage/:parkId" element={<BookingPage />} />

          {/* <Route path="/ParkInfo" element={<ParkInfo />} />
          <Route path="/ParkList" element={<ParkList />} />
          <Route path="/EventList" element={<EventList />} />
          <Route path="/FacilityList" element={<FacilityList />} />
          <Route path="/ParkMap" element={<ParkMap />} />
          <Route path="/ChatForum" element={<ChatForum />} />
          <Route path="/BookingPage" element={<BookingPage />} />
          <Route path="/DeniedForm" element={<DeniedForm />} /> */}
        
      <Route path="*" element={<Navigate to="/Home" replace />} />
    </Routes>
  );
}

export default App;
