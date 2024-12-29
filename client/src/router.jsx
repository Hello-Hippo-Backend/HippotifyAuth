import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Playlist from "./pages/Playlist";
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Playlist />,
      },
      {
        path: ":id",
        element: <Playlist />,
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
  }
]);

export default router;
