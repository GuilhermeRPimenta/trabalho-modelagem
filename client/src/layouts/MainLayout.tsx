import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Main from "../components/main/Main";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
};

export default MainLayout;
