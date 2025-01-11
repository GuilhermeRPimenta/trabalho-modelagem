import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Main from "../components/main/Main";
import { AuthProvider } from "../components/global/AuthProvider";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthProvider>
        <Header />
        <Main>
          <Outlet />
        </Main>
      </AuthProvider>
    </div>
  );
};

export default MainLayout;
