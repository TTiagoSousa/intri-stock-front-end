import { useState } from "react";
import http from "../../Services/httpService";
import { useTranslation } from 'react-i18next';
import { validateEmail } from '../../Utils/email/is.valide.email';
import { isPasswordStrong } from '../../Utils/password/is.password.strong';
import { End_Points } from '../../Services/endPoints';
import { useNavs } from "../../Contexts/Navs_Context";

export const useSignup = () => {

  const { t } = useTranslation();

  const { setAlert } = useNavs();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);

  const signup = async () => {

    if (!email || !password || !confirmPassword) {
      setAlert({
        open: true,
        message: t("All fields are required"),
        type: 'error'
      });

      return;
    }

    if (!validateEmail(email)) {
      setAlert({
        open: true,
        message: t("Invalid email address"),
        type: 'error'
      });

      return;
    }

    if (!isPasswordStrong(password)) {
      setAlert({
        open: true,
        message: t("Password is too weak"),
        type: 'error'
      });

      return;
    }

    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: t("Passwords do not match"),
        type: 'error'
      });

      return;
    }

    if (!terms) {
      setAlert({
        open: true,
        message: t("You must accept the terms and conditions"),
        type: 'error'
      });
      return;
    }


    console.log('Entrou')

    try {
      const response = await http.post(End_Points.Sing_Up_Endpoint(), {
        email,
        password,
        confirmPassword,
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
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    terms, setTerms
  };
};