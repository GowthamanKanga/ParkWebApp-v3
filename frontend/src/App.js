import React from "react";
import EventList from "./pages/EventList";
import FacilityList from "./pages/FacilityList";
import Home from "./pages/Home";
import ParkList from "./pages/ParkList";
import ParkMap from "./pages/ParkMap";
import BookingPage from "./pages/BookingPage";
import ChatForum from "./pages/ChatForum";
import ParkInfo from "./pages/ParkInfo"
import DeniedForm from "./pages/DeniedForm"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/ParkInfo" element={<ParkInfo/>} />
          <Route path="/ParkList" element={<ParkList />} />
          <Route path="/EventList" element={<EventList />} />
          <Route path="/FacilityList" element={<FacilityList />} />
          <Route path="/ParkMap" element={<ParkMap />} />
          <Route path="/ChatForum" element={<ChatForum />} />
          <Route path="/BookingPage" element={<BookingPage/>} />
          <Route path="/DeniedForm" element={<DeniedForm/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;



