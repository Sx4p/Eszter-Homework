import './App.css';
import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import NavBar from "./components/NavBar";
import Table from "./pages/Table";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar/>,
    children: [
      {
        path: "/",
        element: <Table/>
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  }
])

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;