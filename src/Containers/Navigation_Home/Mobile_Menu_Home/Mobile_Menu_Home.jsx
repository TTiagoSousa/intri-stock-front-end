import React from 'react';
import './Mobile_Menu_Home.scss';
import Dark_Div from '../../../Components/Dark_Div/Dark_Div';
import * as Icon from '../../../Imports/icons';
import * as Color from '../../../Styles/Colors';
import { navItems } from '../Navigation_Map';
import { NavLink, useLocation } from 'react-router-dom'; 
import { useNavs } from '../../../Contexts/Navs_Context';

const Mobile_Menu_Home = () => {

  const { mobile_Sidebar_Home, set_Mobile_Sidebar_Home } = useNavs();

  const handleNavLinkClick = () => {
    set_Mobile_Sidebar_Home(false);  // Fecha a nav
  };

  return (
    <>
      <Dark_Div
        toggled={set_Mobile_Sidebar_Home}
        toggle={mobile_Sidebar_Home}
      />

      <nav className={`Mobile_Sidebar_Home ${mobile_Sidebar_Home ? 'active' : ''}`} >
        <React.Fragment>
          <ul className='Nav_Items'>
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink 
                  to={item.to} 
                  className='Nav_Link' 
                  onClick={handleNavLinkClick}
                >
                  <div className="Icon">
                    <div>
                      <Icon.GLobal_SVG Global_Color={location.pathname === item.to ? Color.blue : Color.gray}>
                        {item.icon}
                      </Icon.GLobal_SVG>
                    </div>
                  </div>
                  <div className='Nav_Text'>
                    <span>{item.text}</span>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </React.Fragment>
      </nav>
    </>
  );
};

export default Mobile_Menu_Home;