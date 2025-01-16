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
import ShelterHome from "./pages/restricted/shelter/ShelterHome";
import AnimalRegisterByShelter from "./pages/restricted/shelter/AnimalRegisterByShelter";
import UserAdoptedAnimals from "./pages/restricted/user/UserAdoptedAnimals";
import AdoptedAnimal from "./pages/restricted/user/AdoptedAnimal";

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
        { path: "/user/adoptedAnimals", element: <UserAdoptedAnimals /> },
        {
          path: "/user/adoptedAnimals/:adoptedAnimalId",
          element: <AdoptedAnimal />,
        },
        { path: "/shelterRegister", element: <ShelterRegister /> },
        { path: "/shelters/:shelterId", element: <ShelterHome /> },
        {
          path: "/shelters/:shelterId/animalRegister",
          element: <AnimalRegisterByShelter />,
        },
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
