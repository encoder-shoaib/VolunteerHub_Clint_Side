import { createBrowserRouter } from "react-router-dom";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../Pages/shared/ErrorPage";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/Login";
import VolunteerNeedsNow from "../Pages/VolunteerNeedsNow/VolunteerNeedsNow";
import PostDetails from "../Pages/PostDetails/PostDetails";
import AddPost from "../Pages/AddPost";
import AllPosts from "../Pages/AllPosts";
import AuthContext from "../context/AuthContext";
import ManagePosts from "../Pages/ManagePosts";
import AboutUs from "../Pages/AboutUs";
import FAQs from "../Pages/FAQs";
import Blog from "../Pages/Blog";
import ContactUs from "../Pages/ContactUs";

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-700">Loading...</p>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-posts",
        element: <AllPosts />,
      },
      {
        path: "/add-post",
        element: (
          <PrivateRoute>
            <AddPost />
          </PrivateRoute>
        ),
      },
      {
        path: "/post/:id",
        element: (
          <PrivateRoute>
            <PostDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-posts",
        element: (
          <PrivateRoute>
            <ManagePosts/>
          </PrivateRoute>
        ),
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/blogs",
        element: <Blog/>,
      },
      {
        path: "/FAQs",
        element: <FAQs></FAQs>
      },
      {
        path: "/ContactUs",
        element: <ContactUs></ContactUs>
      },
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;