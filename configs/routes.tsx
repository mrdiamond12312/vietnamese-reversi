import { lazyRouteImport } from "@/utils/lazyRouteImport";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { path } from "@/constants/path";

export const router = createBrowserRouter([
  {
    path: path.HOMEPAGE,
    lazy: () => lazyRouteImport("layouts/Navbar"),
    children: [
      {
        path: path.HOMEPAGE,
        element: <Navigate replace to={path.PLAY_CHESS} />,
      },
      {
        path: path.PLAY_CHESS,
        lazy: () => lazyRouteImport("pages/PlayChess"),
      },
      // {
      //   path: (path),
      //   lazy: () => lazyRouteImport("pages/TermsOfUse"),
      // },
    ],
  },

  {
    path: "*",
    lazy: () => lazyRouteImport("pages/NotFound"),
  },
  {
    path: path.PAGE_NOT_FOUND,
    lazy: () => lazyRouteImport("pages/NotFound"),
  },
]);
