import { useEffect } from "react";  // Certifique-se de importar o useEffect
import http from "../../Services/httpService";
import { useTranslation } from 'react-i18next';
import { useNavs } from "../../Contexts/Navs_Context";
import { End_Points } from '../../Services/endPoints';
import { useNavigate } from "react-router-dom";

export const useActivateAccount = (token) => {

  const { t } = useTranslation();
  const { setAlert } = useNavs();
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const decodedToken = atob(token);
        const response = await http.patch(End_Points.Activate_Account_Endpoint(decodedToken));

        setAlert({
          open: true,
          message: "Account activated successfully.",
          type: 'success'
        });

        setAlert({
          open: true,
          message: t("Account activated successfully."),
          type: 'success'
        });

        setTimeout(() => {
          navigate('/Auth');
        }, 5000);

      } catch (error) {
        if (error.response && error.response.status === 400) {
          let errorMessage = error.response.data.message;
          errorMessage = t(errorMessage);
          setAlert({
            open: true,
            message: errorMessage,
            type: 'error'
          });
        }
      }
    };

    if (token) {
      activateAccount();
    }
  }, [token, navigate, setAlert, t]); 

};
