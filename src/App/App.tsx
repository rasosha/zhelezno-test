import React from "react";
import { RouterProvider } from "react-router-dom";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Dashboard from "../pages/DashboardPage/DashboardPage";
import ListPage from "../pages/ListPage/ListPage";
import NotFoundPage from "../pages/NotFoundPage";

const routerConfig: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "list",
        element: <ListPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
const router = createBrowserRouter(routerConfig);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
