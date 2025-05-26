import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../Pages/shared/ErrorPage";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element:<Home></Home>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element:<Register></Register>
      }
    ]
  },
]);

export default router;
