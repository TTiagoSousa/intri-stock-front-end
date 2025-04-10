import { useState } from "react";
import http from "../../Services/httpService";
import { useTranslation } from 'react-i18next';
import { validateEmail } from '../../Utils/email/is.valide.email';
import { isPasswordStrong } from '../../Utils/password/is.password.strong';
import { End_Points } from '../../Services/endPoints';
import { useNavs } from "../../Contexts/Navs_Context";
import i18n from 'i18next';

export const useSignup = () => {

  const { t } = useTranslation();
  const language = i18n.language;
  const { setAlert } = useNavs();

  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [signUpTerms, setSignUpTerms] = useState(false);

  const signup = async () => {

    if (!signUpEmail || !signUpPassword || !signUpConfirmPassword) {
      setAlert({
        open: true,
        message: t("All fields are required"),
        type: 'error'
      });

      return;
    }

    if (!validateEmail(signUpEmail)) {
      setAlert({
        open: true,
        message: t("Invalid email address"),
        type: 'error'
      });

      return;
    }

    if (!isPasswordStrong(signUpPassword)) {
      setAlert({
        open: true,
        message: t("Password is too weak"),
        type: 'error'
      });

      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      setAlert({
        open: true,
        message: t("Passwords do not match"),
        type: 'error'
      });

      return;
    }

    if (!signUpTerms) {
      setAlert({
        open: true,
        message: t("You must accept the terms and conditions"),
        type: 'error'
      });
      return;
    }

    try {
      const response = await http.post(End_Points.Sing_Up_Endpoint(), {
        email: signUpEmail,
        password: signUpPassword,
        confirmPassword: signUpConfirmPassword,
        language: language,
        terms: signUpTerms
      });

      setAlert({
        open: true,
        message: t("Activation email sent"),
        type: 'success'
      });

      setTimeout(() => {
        window.location.href = '/Sign_In';
      }, 3000);
      
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error)
        let errorMessage = error.response.data.message;
        errorMessage = t(errorMessage);
        setAlert({
          open: true,
          message: errorMessage,
          type: 'error'
        });
      }
    }

    console.log('Erro')
  };


  return {
    signup,
    signUpEmail, setSignUpEmail,
    signUpPassword, setSignUpPassword,
    signUpConfirmPassword, setSignUpConfirmPassword,
    signUpTerms, setSignUpTerms
  };
};