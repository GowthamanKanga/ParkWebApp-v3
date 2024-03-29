import React from "react";
import EventList from "./pages/EventList";
import FacilityList from "./pages/FacilityList";
import Home from "./pages/Home";
import ParkList from "./pages/ParkList";
import ParkMap from "./pages/ParkMap";
import BookingPage from "./pages/BookingPage";
import ChatForum from "./pages/ChatForum";
import ParkInfo from "./pages/ParkInfo";
import DeniedForm from "./pages/DeniedForm";
import EditHome from "./clientPages/EditHome";
import EditFacilityList from "./clientPages/ClientFacilityList";
import ClientEventList from "./clientPages/ClientEventList";
import ClientMap from "./clientPages/ClientMap";
import ParkForm from "./pageCreation/parkForm";
import BookingForm from "./pages/BookingForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/ParkInfo" element={<ParkInfo />} />
          <Route path="/ParkList" element={<ParkList />} />
          <Route path="/EventList" element={<EventList />} />
          <Route path="/FacilityList" element={<FacilityList />} />
          <Route path="/ParkMap" element={<ParkMap />} />
          <Route path="/ChatForum" element={<ChatForum />} />
          <Route path="/BookingPage" element={<BookingPage />} />
          <Route path="/DeniedForm" element={<DeniedForm />} />
          <Route path="/EditHome" element={<EditHome />} />
          <Route path="/EditFacilityList" element={<EditFacilityList />} />
          <Route path="/ClientEventList" element={<ClientEventList />} />
          <Route path="/ClientMap" element={<ClientMap />} />
          <Route path="/ParkForm" element={<ParkForm />} />
          <Route path="/BookingForm" element={<BookingForm/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
