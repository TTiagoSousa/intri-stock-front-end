import { useNavs } from '../../../Contexts/Navs_Context';
import './Header_Home.scss';
import { Sling as Hamburger } from 'hamburger-react';
import * as Color from '../../../Styles/Colors';
import Change_Theme from '../../../Components/Buttons/Change_Theme/Change_Theme';
import * as Icon from '../../../Imports/icons';
import { getIconColor } from '../../../Styles/hooks/getIconColor';
import { useTheme } from '../../../Contexts/Theme_Context';
import { useState } from 'react';
import Change_Language from '../../Selectors/Change_Language/Change_Language';

const Header_Home = () => {

  const { sidebar_Home, setSidebar_Home, showCustomize_Sidebar, typeOfNavifation, show_Mobile_Sidebar_Home} = useNavs();
  const { mode } = useTheme();

  const getHeaderClassName = () => {
    if (typeOfNavifation === 'Sidebar_Home') {
      return 'Header_Home Sidebar_Home';
    } else if (typeOfNavifation === 'Mobile_Menu') {
      return 'Header_Home Mobile_Menu';
    }
    return 'Header_Home'; 
  };

  const [hovered, setHovered] = useState(false);
  
  // Função de mudança de cor ao passar o mouse
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  // Usar a função getIconColor para obter a cor
  const iconColor = getIconColor(mode, hovered);

  return (
    <header className={getHeaderClassName()}>
      {/* <button onClick={showSidebar_Home}> Mobile button</button> */}
      <div className="Left_Side">
        <div className='Menu'>
          { typeOfNavifation === 'Mobile_Menu' ?  (
              <button
                onClick={show_Mobile_Sidebar_Home}
              >
                <div></div>
                <div></div>
                <div></div>
              </button>
            ): <></>
          }
        </div>
      </div>
      <div className='Right_Side'>
        <div className="Buttons_Field">
          <Change_Language />
        </div>
        <div className="Buttons_Field">
          <Change_Theme />
        </div>
        <div className='Buttons_Field'>
          <div className='Icon_Settings'               
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={showCustomize_Sidebar}
          >
            <Icon.Settings
              Global_Color={iconColor}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header_Home;