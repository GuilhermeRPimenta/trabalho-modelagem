import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/public/LandingPage";
import Animals from "./pages/public/Animals";
import Login from "./pages/public/Login";
import AdminLogin from "./pages/public/AdminLogin";
import Animal from "./pages/public/Animal";
import UserHome from "./pages/restricted/user/UserHome";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <LandingPage /> },
        { path: "/animals", element: <Animals /> },
        { path: "/animals/:animalId", element: <Animal /> },
        { path: "/login", element: <Login /> },
        { path: "/user", element: <UserHome /> },
        { path: "/admin", element: <AdminLogin /> },
      ],
    },
  ],
  { basename: "/trabalho-modelagem" }
);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
