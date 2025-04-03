import React, { useState } from 'react';
import './Sign_Up.scss';
import { useTranslation } from 'react-i18next';
import * as Video from '../../../Imports/video';
import Change_Language from '../../../Containers/Selectors/Change_Language/Change_Language';
import Change_Theme from '../../../Components/Buttons/Change_Theme/Change_Theme';
import Simple_Input_And_Lable from '../../../Components/Inputs/Simple_Input_And_Lable/Simple_Input_And_Lable';
import Simple_Button from '../../../Components/Buttons/Simple_Button/Simple_Button';
import { useSignup } from '../../../Hooks/Auth/useSignup';
import { Link } from 'react-router';
import Simple_Alert from '../../../Components/Alerts/Simple_Alert/Simple_Alert';

const Sign_Up = () => {

  const { t } = useTranslation();

  const { 
    signup,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    terms, setTerms
  } = useSignup();

  // Disable button if any field is empty
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signup();
    } finally {
      setIsLoading(false);
    }
  };

  // Disable button if any field is empty or while loading
  const isDisabled = !email || !password || !confirmPassword || !terms || isLoading;

  return (
    <div className='Sign_Up'>

      <div className='Alert'>
        <Simple_Alert />
      </div>
      
      <div className='Image_Container'>
        <video autoPlay loop muted>
          <source src={Video.Mounth} type='video/mp4'/>
        </video>
      </div>

      <div className='Form_Container'>
        <header>
          <div className='Button_Field'>
            <Change_Language />
          </div>
          <div className='Button_Field'>
            <Change_Theme />
          </div>
        </header>

        <form>
          <div className="Title">
            <span>{t('Sign up')}</span>
          </div>
          <div className="Input_Field">
            <Simple_Input_And_Lable
              label_text={t('Email')}
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="Input_Field">
            <Simple_Input_And_Lable 
              type='password'
              label_text={t('Password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="Input_Field">
            <Simple_Input_And_Lable 
              type='password'
              label_text={t('Repete password')}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="Check_Field">
            <div>
              <input 
                type='checkbox'
                onChange={(e) => setTerms(e.target.checked)}
              ></input>
              <span>{t('Accept the terms')}</span>
            </div>
            <div>
              <span>{t("Check terms")}</span>
            </div>
          </div>
          <div className="Button_Field">
            <Simple_Button
              text={isLoading ? t('Loading...') : t('Sign up')}
              disabled={isDisabled}
              onClick={handleSubmit}
            />
          </div>
        </form>

        <div className='Info'>
          <span>{t('Already have a account ? -')}</span>
          <Link to="/Sign_In">{t('Click here')}</Link>
        </div>
      </div>
    </div>
  )
};

export default Sign_Up;
