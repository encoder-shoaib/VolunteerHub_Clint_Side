import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../Pages/shared/ErrorPage";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/Login";
import VolunteerNeedsNow from "../Pages/VolunteerNeedsNow/VolunteerNeedsNow";
import PostDetails from "../Pages/PostDetails/PostDetails";
import AddPostForm from "../Pages/AddPostForm/AddPostForm";

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
        path: '/volunteer-needs-post',
        element: <VolunteerNeedsNow></VolunteerNeedsNow>,

      },
      {
        path: '/add-post',
        element:<AddPostForm></AddPostForm>
      },
      {
        path: '/post-detailed/:id',
        element: <PostDetails />
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
