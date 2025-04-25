import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Intermediate_Pages from '../Imports/intermediary.pages'
import { useAuth } from '../Contexts/Auth_Context';

const Authentication_Check = ({ children }) => {
  const { authenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !authenticated) {
      navigate('/');
    }
  }, [isLoading, authenticated, navigate]);

  if (isLoading) {
    return <Intermediate_Pages.Loading_Page />;
  }

  return authenticated ? children : null;
};

export default Authentication_Check;
