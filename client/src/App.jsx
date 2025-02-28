import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  Home,
  About,
  Help,
  SignIn,
  SignUp /* Step1_SelectType, Step2_Inputs, Step3_Results */,
} from "./pages";

// import { DesignLayout } from "./components";

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
