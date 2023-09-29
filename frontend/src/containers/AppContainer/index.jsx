import Header from "@/components/layout/Header.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar.jsx";
import { getUserFromLocalStorage } from "@/utils/authUtils.js";
import { useEffect } from "react";
import AppConfig from "@/constants/AppConfig.js";
import Routes from "@/routes";

function AppContainer() {
  const history = useHistory();
  const currentUser = getUserFromLocalStorage();

  useEffect(() => {
    if (!currentUser) {
      history.push({
        pathname: AppConfig.ROUTES.LOGIN,
      });
    }
  }, [currentUser]);
  return (
    <div className="bg-gray-100 font-family-karla flex">
      <Sidebar />
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <Header />
        <div className="w-full overflow-x-hidden border-t flex flex-col">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default AppContainer;
