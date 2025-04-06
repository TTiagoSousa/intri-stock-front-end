import React from 'react';
import './Active_Account.scss';
import http from "../../../Services/httpService";
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useActivateAccount } from '../../../Hooks/Auth/useActivateAccount';

const Active_Account = () => {

  const { t } = useTranslation();
  const { token } = useParams();

  useActivateAccount(token);
  
  return (
    <div className='Active_Account'> 
      <h1>{t('Activating the account')}</h1>
      <div className='Sub_Tittle'>
        <h2>{t('Please wait...')}</h2>
      </div>
    </div>
  )
};

export default Active_Account;