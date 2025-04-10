import { useState } from "react";
import http from "../../Services/httpService";
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../Utils/email/is.valide.email';
import { useTranslation } from 'react-i18next';
import { useNavs } from "../../Contexts/Navs_Context";
import { End_Points } from "../../Services/endPoints";
import { useAuth } from "../../Contexts/Auth_Context";

export const useSignin = () => {
  const { t } = useTranslation();
  const [signInEmail, setSignInEmail] = useState('');
  const [signInpassword, setSignInpassword] = useState('');

  const navigate = useNavigate();
  const { setAlert } = useNavs();
  const { refreshUser } = useAuth();

  const signin = async () => {
    // console.log("🔐 Tentando login com:", signInEmail);

    if (!signInEmail || !signInpassword) {
      // console.warn("⚠️ Campos em branco");
      return setAlert({
        open: true,
        message: t("All fields must be filleds"),
        type: 'error'
      });
    }

    if (!validateEmail(signInEmail)) {
      // console.warn("⚠️ Email inválido");
      return setAlert({
        open: true,
        message: t("Invalid email"),
        type: 'error'
      });
    }

    try {
      // console.log("📡 Enviando pedido para:", End_Points.Sing_In_Endpoint());

      const response = await http.post(
        End_Points.Sing_In_Endpoint(),
        { email: signInEmail, password: signInpassword },
        { withCredentials: true }
      );

      // console.log("✅ Login bem-sucedido:", response.status);
      // console.log("📥 Dados recebidos:", response.data);

      setAlert({
        open: true,
        message: t("Login successful"),
        type: 'success',
      });

      setTimeout(() => {
        window.location.href = '/Main';
      }, 300);

    } catch (error) {
      // console.error("❌ Erro no login:", error);
      const msg = error.response?.data?.message || error.message || "Something went wrong";
      setAlert({
        open: true,
        message: t(msg),
        type: 'error',
      });
    }
  };

  return {
    signInEmail, setSignInEmail,
    signInpassword, setSignInpassword,
    signin,
  };
};
