import React, { useState } from 'react';
import './Change_Theme.scss';
import * as Color from '../../../Styles/Colors';
import * as Icon from '../../../Imports/icons';
import { useTheme } from '../../../Contexts/Theme_Context';
import { getIconColor } from '../../../Styles/hooks/getIconColor';

const Change_Theme = () => {

  const { handleDarkMode, handleLightMode, mode } = useTheme();
  const [hovered, setHovered] = useState(false);

  const toggleTheme = () => {
    if (mode === 'light') {
      handleDarkMode();
    } else {
      handleLightMode();
    }
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const getIcon = () => {
    let color;

    if (mode === 'dark') {
      color = hovered ? Color.yellow : Color.gray;
    } else if (mode === 'light') {
      color = hovered ? Color.yellow : Color.gray_dark;
    } else {
      color = hovered ? Color.blue : Color.gray;
    }

    return mode === 'dark' 
      ? <Icon.Moon_N1 Global_Color={color} /> 
      : <Icon.Sun_N1 Global_Color={color} />;
  };

  const iconColor = getIconColor(mode, hovered);

  return (
    <div className="Change_Theme">
      <button 
        onClick={toggleTheme} 
        className={`theme-button ${mode}`}
        title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="Icon">
          {getIcon()}
        </div>
      </button>
    </div>
  )
};

export default Change_Theme;
