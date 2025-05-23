import React, { useEffect, useState } from 'react';
import './Header_Index.scss';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import Change_Language from '../../Selectors/Change_Language/Change_Language';
import { useAuth } from '../../../Contexts/Auth_Context';

const Header_Index = () => {

  const { t } = useTranslation();

  const { authenticated, isLoading } = useAuth();

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollPos, setLastScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

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
    <div className="Header_Index">
      <div>
        <div className="Title">
          <span>IntriStock</span>
        </div>
      </div>
      <div>
        <div className="Buttons">
          <Change_Language />
        </div>
        {!isLoading && (
          authenticated ? (
            <Link className='Dashboard_Button' to="Main">
              {t("Back to Dashboard")}
            </Link>
          ) : (
            <>
              <Link className='Sign_in_Button' to="Auth">{t("Sign in")}</Link>
              <Link className='Sign_up_Button' to='Auth' state={{ signup: true }}>{t("Sign up")}</Link>
            </>
         )
        )}
      </div>
    </div>
  )
};

export default Header_Index;