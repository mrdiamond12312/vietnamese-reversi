import { Navigate, createBrowserRouter } from "react-router-dom";
import { path } from "@/constants/path";
import React from "react";
import NotFound from "@/pages/NotFound";

const NavBar = React.lazy(() => import("@/layouts/Navbar"));
const PlayChess = React.lazy(() => import("@/pages/PlayChess"));

export const router = createBrowserRouter([
  {
    path: path.HOMEPAGE,
    element: <NavBar />,
    children: [
      {
        path: path.HOMEPAGE,
        element: <Navigate replace to={path.PLAY_CHESS} />,
      },
      {
        path: path.PLAY_CHESS,
        element: <PlayChess />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: path.PAGE_NOT_FOUND,
    element: <NotFound />,
  },
]);
