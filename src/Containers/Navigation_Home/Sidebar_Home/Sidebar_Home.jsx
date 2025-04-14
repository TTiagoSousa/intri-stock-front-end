import { NavLink, useLocation } from 'react-router-dom'; 
import { useNavs } from '../../../Contexts/Navs_Context';
import './Sidebar_Home.scss';
import { navItems } from '../Navigation_Map';
import React from 'react';
import * as Icon from '../../../Imports/icons';
import * as Color from '../../../Styles/Colors';

const Sidebar_Home = () => {

  const { sidebar_Home } = useNavs();
  const location = useLocation();

  return (
    <nav className={`SideBar_Home ${sidebar_Home ? '' : 'close'}`}>
      <React.Fragment>
        <ul className='Nav_Items'>
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink to={item.to} className='Nav_Link'> {/* Corrigir 'hto' para 'to' */}
                <div className="Icon">
                  <div>
                    <Icon.GLobal_SVG Global_Color={location.pathname === item.to ? Color.blue : Color.gray}>
                      {item.icon}
                    </Icon.GLobal_SVG>
                  </div>
                </div>
                <div className={`Nav_Text ${sidebar_Home ? '' : 'Close_Sidebar'}`}>
                  <span>{item.text}</span>
                </div>
                <div className={`Tooltip ${sidebar_Home ? 'hide' : 'show'}`}>
                  <span>
                    {item.text}
                  </span>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </React.Fragment>
    </nav>
  );
};

export default Sidebar_Home;