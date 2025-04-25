import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {

  // Alert  
    const [ alert, setAlert ] = useState({
      open: false, // Alert Close
      message: "", // Alert message
      type: "", // type of alert
    })
  // Alert

  // Open SideBarHome
    const [ sidebar_Home, setSidebar_Home ] = useState(false);
    const showSidebar_Home = () => setSidebar_Home(!sidebar_Home);
  // Open SideBarHome

  // Open SideBarHome
    const [ mobile_Sidebar_Home, set_Mobile_Sidebar_Home ] = useState(false);
    const show_Mobile_Sidebar_Home = () => set_Mobile_Sidebar_Home(!mobile_Sidebar_Home);
  // Open SideBarHome

  // Customize Sidebar
    const [ customize_Sidebar, setCustomize_Sidebar ] = useState(false);
    const showCustomize_Sidebar = () => setCustomize_Sidebar(!customize_Sidebar);
  // Customize Sidebar

  // Choose navigation type
    const [typeOfNavifation, setTypeOfNavifation] = useState(
      localStorage.getItem("sidebarPosition") || "Sidebar_Home"
    );

    useEffect(() => {
      localStorage.setItem("sidebarPosition", typeOfNavifation);
    }, [typeOfNavifation]);

    function handleTypeofPositionChange(e) {
      const position = e.target.value;
      switch (position) {
        case "Sidebar_Home":
        case "Top_Nav_Navigation":
        case "Mobile_Menu":
          setTypeOfNavifation(position);
          break;
        default:
          console.log("Invalid position");
      }
    }

    useEffect(() => {
      function handleResize() {
        const isMobile = window.innerWidth < 1300;
        if (isMobile) {
          setTypeOfNavifation("Mobile_Menu");
        }
    }
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  // Choose navigation type

  return (
    <NavigationContext.Provider
      value={{
        alert, setAlert,
        typeOfNavifation, setTypeOfNavifation, handleTypeofPositionChange,
        sidebar_Home, setSidebar_Home, showSidebar_Home,
        mobile_Sidebar_Home, set_Mobile_Sidebar_Home, show_Mobile_Sidebar_Home,
        customize_Sidebar, setCustomize_Sidebar, showCustomize_Sidebar,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

NavigationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useNavs() {
  return useContext(NavigationContext);
}
