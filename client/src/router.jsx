import { Navigate, createBrowserRouter } from "react-router-dom";

import App from "./App";
import Playlist from "./pages/Playlist";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/playlist" replace />,
  },
  {
    path: "/playlist",
    element: <App />,
    children: [
      {
        path: "/playlist",
        element: <Playlist />,
      },
      {
        path: "/playlist/:id",
        element: <Playlist />,
      },
      {
        path: "/playlist/admin",
        element: <Admin />,
      },
    ],
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;
