import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Router from "./Router";
import { theme } from "./theme";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      {/* <RouterProvider router={router} /> */}
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </QueryClientProvider>
  </ThemeProvider>
  // </React.StrictMode>
);
