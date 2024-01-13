import React from "react";
import "@/global.less";
import { path } from "@/constants/path";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className=" flex flex-col text-neutral-5 text-center items-center justify-center gap-4 w-[100vw] min-h-[100vh] bg-[url('https://static.vecteezy.com/system/resources/previews/013/258/789/non_2x/black-and-white-page-for-the-design-of-the-web-application-error-404-large-numbers-on-the-background-of-a-planet-and-a-ufo-drawing-in-the-style-of-a-doodle-free-vector.jpg')] bg-no-repeat bg-cover bg-center ">
      {/* <div className="invert  bg-inherit"> */}
      <h1 className="font-sans  text-[200px] leading-[240px] font-extrabold mix-blend-difference">
        Oops!
      </h1>
      <span className="text-6xl font-bold mix-blend-difference">
        404 - PAGE NOT FOUND!
      </span>
      <span className="text-heading-5 mix-blend-difference">
        The page that you're looking for is not here, changed or removed!
      </span>
      <Link to={path.HOMEPAGE}>
        <Button
          variant="contained"
          className="mix-blend-difference !bg-neutral-3 !text-neutral-10 !text-body-1-semibold !h-12"
        >
          Go to Homepage
        </Button>
      </Link>
      {/* </div> */}
    </div>
  );
};

export default NotFound;
