import React, { useEffect, useRef, useState } from 'react';
import './Change_Language.scss';
import { useTranslation } from 'react-i18next';
import * as Color from '../../../Styles/Colors';
import * as Icon from '../../../Imports/icons';
import { useTheme } from '../../../Contexts/Theme_Context';
import { languages } from '../../../Constants/languages';
import Simple_Input_And_Lable from '../../../Components/Inputs/Simple_Input_And_Lable/Simple_Input_And_Lable';

const Change_Language = () => {

  const { i18n, t } = useTranslation();
  const { mode } = useTheme();

  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const menuRef = useRef(null);

  // Definimos a cor do ícone com base no tema e no estado de hover
  const getIconColor = () => {
    if (mode === 'dark') {
      return isHovered ? Color.yellow : Color.gray;
    } else if (mode === 'light') {
      return isHovered ? Color.yellow : Color.gray_dark;
    } else {
      return isHovered ? Color.yellow : Color.gray;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [languageSearch, setLanguageSearch] = useState('');

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang); // Altera o idioma com o i18n
    localStorage.setItem('language', lang); // Armazena o idioma no localStorage
    setOpen(false); // Fecha o menu após a seleção
  };

  // Filtered lists based on search input
  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(languageSearch.toLowerCase())
  );

  return (
    <div 
      className='Change_Language'
      ref={menuRef}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div>
          <Icon.World Global_Color={getIconColor()} />
        </div>
      </button>
      <div className={`Language_Options ${open ? 'active' : 'inactive'}`}>
        <div className='Arrow'></div>
        <div className='Language_Selector'>
          <div className='Title'>
            <span>{t('Language')}</span>
          </div>
          <div className='Input_Field'>
            <Simple_Input_And_Lable
              inputTypeStyle='type1' 
              placeholder={t('Shearch')}
              value={languageSearch}
              onChange={(e) => setLanguageSearch(e.target.value)}
            />
          </div>
          <ul>
            {filteredLanguages.map(lang => (
              <li key={lang.value} onClick={() => handleChangeLanguage(lang.value)}>
                <span>{lang.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
};

export default Change_Language;