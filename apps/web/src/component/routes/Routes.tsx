import { Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import Landing from "../landing/Landing";
import Logout from "../logout/Logout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};

export default AppRoutes;

