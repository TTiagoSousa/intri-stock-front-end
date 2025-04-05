import React, { useRef, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import './Simple_Alert.scss';
import { useNavs } from '../../../Contexts/Navs_Context';

const Simple_Alert = () => {
  const toast = useRef(null);
  const { alert, setAlert } = useNavs();

  useEffect(() => {
    if (alert.open) {
      toast.current.show({
        severity: alert.type,
        summary: alert.type.charAt(0).toUpperCase() + alert.type.slice(1),
        detail: alert.message,
        life: 1000,
      });
      // Reseta o alerta após exibir
      setAlert({ ...alert, open: false });
    }
  }, [alert, setAlert]);

  return <div className='Simple_Alert'><Toast ref={toast} /></div>;
};

export default Simple_Alert;