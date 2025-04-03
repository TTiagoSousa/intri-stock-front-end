import React, { useEffect, useState } from 'react';
import './Header_Index.scss';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import Change_Language from '../../Selectors/Change_Language/Change_Language';

const Header_Index = () => {

  const { t } = useTranslation();

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollPos, setLastScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      // Se a posição atual for maior que a última, significa que está rolando para BAIXO
      if (currentScrollPos > lastScrollPos) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    // Remove o listener quando o componente desmontar
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollPos]);

  return (
    <div className={`Header_Index ${showHeader ? 'visible' : 'hidden'}`}>
      <div>
        <div className="Title">
          <span>Intri Stock</span>
        </div>
      </div>
      <div>
        <div className="Buttons">
          <Change_Language />
        </div>
        <Link className='Sign_in_Button'>{t("Sign in")}</Link>
        <Link className='Sign_up_Button' to='Sign_Up'>{t("Sign up")}</Link>
      </div>
    </div>
  )
};

export default Header_Index;