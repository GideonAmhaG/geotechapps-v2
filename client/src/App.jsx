import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  Home,
  About,
  Help,
  Login,
  SignUp,
  Design /* Step1_SelectType, Step2_Inputs, Step3_Results */,
} from "./pages";

import { Navbar, Footer /* DesignLayout */ } from "./components";

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
        </div>
        <div className="pt-15">
          <Routes>
            {/* General Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/design" element={<Design />} />

            {/* Design Workflow */}
            {/* <Route path="/design" element={<DesignLayout />}>
          <Route index element={<Step1_SelectType />} />
          <Route path="inputs" element={<Step2_Inputs />} />
          <Route path="results" element={<Step3_Results />} />
        </Route> */}
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
