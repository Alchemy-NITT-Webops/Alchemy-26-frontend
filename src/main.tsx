import { Suspense } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import Events from "./pages/Events/Events";
import MerchStore from "./pages/MerchStore/MerchStore";
import OurTeam from "./pages/OurTeam/OurTeam";
import Sponsors from "./pages/Sponsors/Sponsors";
import Schedule from "./pages/Schedule/Schedule";
import Gallery from "./pages/Gallery/Gallery";
import { Footer, Navbar } from "./components";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<h1>Loading...</h1>}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/events" element={<Events />} />
        <Route path="/merchstore" element={<MerchStore />} />
        <Route path="/ourteam" element={<OurTeam />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </Suspense>,
);
