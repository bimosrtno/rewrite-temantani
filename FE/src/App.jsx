import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LayoutWeb from "./pages/SalesAdmin/WebLayoutPage/LayoutWeb";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <Routes>
        <Route path="/web-layout" element={<LayoutWeb />} />
      </Routes>
    </Router>
  );
}
