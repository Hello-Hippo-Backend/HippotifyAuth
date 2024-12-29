import * as React from "react";
import { Provider } from "./components/ui/provider"
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";

import router from "./router";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);
