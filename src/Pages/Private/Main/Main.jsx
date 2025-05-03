import React from 'react';
import { useNavs } from '../../../Contexts/Navs_Context';
import Private_Routes from '../../../Routes/Private_Routes';
import './Main.scss';
import Sidebar_Home from '../../../Containers/Navigation_Home/Sidebar_Home/Sidebar_Home';
import Header_Home from '../../../Containers/Headers/Header_Home/Header_Home';
import Mobile_Menu_Home from '../../../Containers/Navigation_Home/Mobile_Menu_Home/Mobile_Menu_Home';
import Custumize_Sidebar from '../../../Containers/Menus/Custumize_Sidebar/Custumize_Sidebar';

const Main = () => {

  const { typeOfNavifation, sidebar_Home } = useNavs();

  function getNavClass() {
    switch (typeOfNavifation) {
      case "Sidebar_Home":
        return "Container_Sidebar_Home"
      case "Mobile_Menu":
        return "Container_With_MobileMenu";
      default:
        console.log("Invalid position");
        return "";
    }
  }

  return (
    <>
      <Header_Home />
      <Custumize_Sidebar />

      {
        typeOfNavifation === "Sidebar_Home" ? (
          <Sidebar_Home />
        ) : typeOfNavifation === "Mobile_Menu" ? (
          <Mobile_Menu_Home />
        ) : null
      }

      <div className='Intri'>
        <div className={getNavClass()}>
          <Private_Routes />  
        </div>
      </div>
    </>
  )
};

export default Main;