import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LayoutWeb from "./pages/SalesAdmin/WebLayoutPage/LayoutWeb";
import CustomerPage from "./pages/SalesAdmin/CustomerPage/CustomerPage";
import TemplateMenagerPage from "./pages/SuperAdmin/TemplateMenagerPage/TemplateMenager"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/web-layout" element={<LayoutWeb />} />
        <Route path="/customer-page" element={<CustomerPage />} />
        <Route path="/template-manager" element={<TemplateMenagerPage/>}/>
      </Routes>
    </Router>
  );
}
