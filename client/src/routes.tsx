import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
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
import UserDonatedAnimals from "./pages/restricted/user/UserDonatedAnimals";
import UserDonatedAnimal from "./pages/restricted/user/UserDonatedAnimal";
import UserAnimalsInDonation from "./pages/restricted/user/UserAnimalsInDonation";
import UserAnimalInDonation from "./pages/restricted/user/UserAnimalInDonation";
import About from "./pages/public/About";
import Donations from "./pages/public/Donations";
import ShelterAdoptedAnimals from "./pages/restricted/shelter/ShelterAdoptedAnimals";
import ShelterAdoptedAnimal from "./pages/restricted/shelter/ShelterAdoptedAnimal";
import ShelterDonatedAnimals from "./pages/restricted/shelter/ShelterDonatedAnimals";
import ShelterDonatedAnimal from "./pages/restricted/shelter/ShelterDonatedAnimal";
import ShelterAnimalsInDonation from "./pages/restricted/shelter/ShelterAnimalsInDonation";
import ShelterAnimalInDonation from "./pages/restricted/shelter/ShelterAnimalInDonation";
import AdminHome from "./pages/restricted/admin/AdminHome";
import Users from "./pages/restricted/admin/Users";
import User from "./pages/restricted/admin/User";
import AdminAnimal from "./pages/restricted/admin/AdminAnimal";
import AdminAnimals from "./pages/restricted/admin/AdminAnimals";
import AdminShelters from "./pages/restricted/admin/AdminShelters";
import AdminShelter from "./pages/restricted/admin/AdminShelter";
import UserShelters from "./pages/restricted/user/UserShelters";
import ShelterAdministration from "./pages/restricted/shelter/ShelterAdministration";
import UserEditAnimal from "./pages/restricted/user/UserEditAnimal";
import ShelterEditAnimal from "./pages/restricted/shelter/ShelterEditAnimal";
import UserRequests from "./pages/restricted/user/UserRequests";
import ShelterRequests from "./pages/restricted/shelter/ShelterRequests";
import UserProfile from "./pages/public/UserProfile";
import ShelterProfile from "./pages/public/ShelterProfile";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Navigate to="/animals" replace /> },
        { path: "/about", element: <About /> },
        { path: "/donations", element: <Donations /> },
        { path: "/animals", element: <Animals /> },
        { path: "/animals/:animalId", element: <Animal /> },
        { path: "/register", element: <UserRegister /> },
        { path: "/login", element: <Login /> },
        { path: "/user", element: <UserHome /> },
        { path: "/users/:userId", element: <UserProfile /> },
        {
          path: "/sheltersProfiles/:institutionId",
          element: <ShelterProfile />,
        },
        { path: "/user/edit", element: <UserEdit /> },
        { path: "/user/animalRegister", element: <AnimalRegister /> },
        { path: "/user/adoptedAnimals", element: <UserAdoptedAnimals /> },
        {
          path: "/user/adoptedAnimals/:adoptedAnimalId",
          element: <AdoptedAnimal />,
        },
        { path: "/user/donatedAnimals", element: <UserDonatedAnimals /> },
        {
          path: "user/donatedAnimals/:donatedAnimalId",
          element: <UserDonatedAnimal />,
        },
        { path: "/user/animalsInDonation", element: <UserAnimalsInDonation /> },
        {
          path: "/user/animalsInDonation/:animalInDonationId",
          element: <UserAnimalInDonation />,
        },
        {
          path: "/user/animalsInDonation/:animalId/edit",
          element: <UserEditAnimal />,
        },
        { path: "/user/adoptionRequests", element: <UserRequests /> },
        { path: "/user/shelters", element: <UserShelters /> },
        { path: "/shelterRegister", element: <ShelterRegister /> },
        { path: "/shelters/:institutionId", element: <ShelterHome /> },
        {
          path: "/shelters/:institutionId/admin",
          element: <ShelterAdministration />,
        },
        {
          path: "/shelters/:institutionId/animalRegister",
          element: <AnimalRegisterByShelter />,
        },
        {
          path: "/shelters/:institutionId/adoptedAnimals",
          element: <ShelterAdoptedAnimals />,
        },
        {
          path: "/shelters/:institutionId/adoptedAnimals/:adoptedAnimalId",
          element: <ShelterAdoptedAnimal />,
        },
        {
          path: "/shelters/:institutionId/donatedAnimals",
          element: <ShelterDonatedAnimals />,
        },
        {
          path: "/shelters/:institutionId/donatedAnimals/:donatedAnimalId",
          element: <ShelterDonatedAnimal />,
        },
        {
          path: "/shelters/:institutionId/animalsInDonation",
          element: <ShelterAnimalsInDonation />,
        },
        {
          path: "/shelters/:institutionId/animalsInDonation/:animalInDonationId",
          element: <ShelterAnimalInDonation />,
        },
        {
          path: "/shelters/:institutionId/animalsInDonation/:animalId/edit",
          element: <ShelterEditAnimal />,
        },
        {
          path: "/shelters/:institutionId/adoptionRequests",
          element: <ShelterRequests />,
        },
        { path: "/adminLogin", element: <AdminLogin /> },
        { path: "/admin", element: <AdminHome /> },
        { path: "/admin/users", element: <Users /> },
        { path: "/admin/users/:userId", element: <User /> },
        { path: "/admin/animals", element: <AdminAnimals /> },
        { path: "/admin/animals/:animalId", element: <AdminAnimal /> },
        { path: "/admin/shelters", element: <AdminShelters /> },
        { path: "/admin/shelters/:shelterId", element: <AdminShelter /> },
      ],
    },
  ],
  { basename: "/trabalho-modelagem" }
);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
