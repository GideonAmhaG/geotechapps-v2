import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Help from "./pages/Help";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
// import Step1_SelectType from "./pages/Step1_SelectType";
// import Step2_Inputs from "./pages/Step2_Inputs";
// import Step3_Results from "./pages/Step3_Results";

// import DesignLayout from "./components/DesignLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* General Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Design Workflow */}
        {/* <Route path="/design" element={<DesignLayout />}>
          <Route index element={<Step1_SelectType />} />
          <Route path="inputs" element={<Step2_Inputs />} />
          <Route path="results" element={<Step3_Results />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
