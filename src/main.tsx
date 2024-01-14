import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import { Provider } from "react-redux";

import { router } from "@/../configs/routes";
import store from "@/storage/store";

import "@/global.less";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <StyledEngineProvider injectFirst>
          <RouterProvider router={router} />
        </StyledEngineProvider>
      </QueryClientProvider>
    </React.StrictMode>
  </Provider>
);
