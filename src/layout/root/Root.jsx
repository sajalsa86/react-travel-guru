import { Outlet } from "react-router-dom";
import Navbar from "../../pages/shared/Navbar";

const Root = () => {
  return (
    <div className="max-w-6xl mx-auto font-poppins">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default Root;
