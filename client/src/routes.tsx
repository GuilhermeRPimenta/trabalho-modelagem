import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/public/LandingPage";
import Animals from "./pages/public/Animals";
import Login from "./pages/public/Login";
import AdminLogin from "./pages/public/AdminLogin";
import Animal from "./pages/public/Animal";
import UserHome from "./pages/restricted/user/UserHome";
import UserRegister from "./pages/public/UserRegister";
import AnimalRegister from "./pages/restricted/user/AnimalRegister";
import UserEdit from "./pages/restricted/user/UserEdit";
import ShelterRegister from "./pages/restricted/shelter/ShelterRegister";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <LandingPage /> },
        { path: "/animals", element: <Animals /> },
        { path: "/animals/:animalId", element: <Animal /> },
        { path: "/register", element: <UserRegister /> },
        { path: "/login", element: <Login /> },
        { path: "/user", element: <UserHome /> },
        { path: "/user/edit", element: <UserEdit /> },
        { path: "/user/animalRegister", element: <AnimalRegister /> },
        { path: "/shelterRegister", element: <ShelterRegister /> },
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
