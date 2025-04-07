import React, { useEffect, useState } from 'react';
import './Auth.scss';
import * as Image from '../../../Imports/images';
import Simple_Input_And_Lable from '../../../Components/Inputs/Simple_Input_And_Lable/Simple_Input_And_Lable';
import Simple_Button from '../../../Components/Buttons/Simple_Button/Simple_Button';
import { useTranslation } from 'react-i18next';
import Simple_Alert from '../../../Components/Alerts/Simple_Alert/Simple_Alert';
import { useSignup } from '../../../Hooks/Auth/useSignup';
import { useLocation } from 'react-router';
import Simple_Model from '../../../Components/Models/Simple_Model/Simple_Model';

const Auth = () => {

  const { t } = useTranslation();

  const { state } = useLocation();

  useEffect(() => {

    if (state?.signup) {
      setIsSignUp(true);
    }
  }, [state]);

  const [isSignUp, setIsSignUp] = useState(false);

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  const { 
    signup,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    terms, setTerms
  } = useSignup();

  // Disable button if any field is empty
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitSignUp = async (e) => {
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

  const [showModal, setShowModal] = useState(false);

  return (
    <div className={`Auth ${isSignUp ? 'sign-up-mode' : ''}`}>

      <div className='Alert'>
        <Simple_Alert  />
      </div>

      <Simple_Model 
        visible={showModal}
        setVisible={setShowModal}
        title="Termos e Condições"
        content="Ao continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condiçõesAo continuar a utilizar esta aplicação, aceita os nossos termos e condições."
      />

      <div className="Forms_Container">
        <div className="Signin_Signup">
          <form className={`Sign_In_Form ${isSignUp ? 'hide' : ''}`}>
            <h2 className="Title">{t("Sign in")}</h2>
            <div className="Input_Field">
              <Simple_Input_And_Lable 
              label_text={"Email"}
              />
            </div>
            <div className="Input_Field">
              <Simple_Input_And_Lable 
                label_text={t('Password')}
                type="password"
              />
            </div>
            <div className='Button_Field'>
              <Simple_Button 
                text={t('Sign in')}
              />
            </div>
          </form>

          <form action="#" className={`Sign_Up_Form ${isSignUp ? 'show' : ''}`}>
            <h2 className="Title">{t("Sign up")}</h2>
            <div className="Input_Field">
              <Simple_Input_And_Lable 
              label_text={"Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="Input_Field">
              <Simple_Input_And_Lable 
                label_text={t('Password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <div className="Input_Field">
              <Simple_Input_And_Lable 
                label_text={t('Repete password')}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
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
                <span onClick={() => setShowModal(true)}>{t("Check terms")}</span>
              </div>
            </div>
            <div className='Button_Field'>
              <Simple_Button 
                text={isLoading ? t('Loading...') : t('Sign up')}
                disabled={isDisabled}
                onClick={handleSubmitSignUp}
              />
            </div>
          </form>
        </div>
      </div>

      <div className="Panels_Container">
        <div className="Panel Left_Panel">
          <div className="Content">
            <h3>{t("New here ?")}</h3>
            <p>
              {t("Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam ad deleniti.")}
            </p>
            <button className="Button Transparent" onClick={toggleMode}>
              {t("Sign up")}
            </button>
          </div>
          <img src={Image.Image2} className="Image" alt="Login Illustration" />

        </div>
        <div className="Panel right-panel">
          <div className="Content">
            <h3>{t("One of us ?")}</h3>
            <p>
              {t("Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam ad deleniti.")}
            </p>
            <button className="Button Transparent" onClick={toggleMode}>
              {t("Sign in")}
            </button>
          </div>
          <img src={Image.Image1} className="Image" alt="Register Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
