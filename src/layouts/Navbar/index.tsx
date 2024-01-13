import { path } from "@/constants/path";
import { Link, Outlet } from "react-router-dom";

import React from "react";

const NavBar: React.FC = () => {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <div className="px-12 bg-gray-800 h-20 text-white flex flex-row items-center justify-between sticky top-0 left-0 z-20">
        <Link to={path.HOMEPAGE} className="text-heading-4">
          CỜ GÁNH
        </Link>
        <div className="flex flex-row items-center h-full">
          <Link
            to={path.HOMEPAGE}
            className="flex justify-center items-center text-heading-4 hover:bg-gray-500 h-full"
          >
            <span className="p-4 text-body-1-semibold">Cách chơi</span>
          </Link>
          <Link
            to={path.HOMEPAGE}
            className="flex justify-center items-center text-heading-4 hover:bg-gray-500 h-full"
          >
            <span className="p-4 text-body-1-semibold">Liên hệ</span>
          </Link>
        </div>
      </div>
      <div className=" min-h-[calc(100vh-160px)] h-fit max-w-7xl w-11/12 mx-auto my-4">
        <Outlet />
      </div>
      <div className="px-12  bg-gray-800 h-12 w-full text-white flex flex-row items-center justify-center">
        <span className="text-heading-5">FOOTER</span>
      </div>
    </div>
  );
};

export default NavBar;
