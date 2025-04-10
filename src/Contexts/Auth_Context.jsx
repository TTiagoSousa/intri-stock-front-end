import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { End_Points } from '../Services/endPoints';
import http from '../Services/httpService';

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserID] = useState(null);
  const [userPlan, setUserPlan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    // console.log("🔁 [AuthProvider] A verificar autenticação do utilizador...");
    setIsLoading(true);
  
    try {
      const response = await http.get(End_Points.User_Endpoint(), {
        withCredentials: true,
      });
  
      const user = response.data;
      // console.log("✅ [AuthProvider] Utilizador autenticado:", user);
  
      setAuthenticated(true);
      setUserID(user.id);
      setUserPlan(user.purchases?.map(p => p.plan.name) || []);
    } catch (error) {
      if (error.response?.status === 401) {
        // console.log("ℹ️ [AuthProvider] Utilizador não autenticado (401).");
      } else {
        // console.error("❌ [AuthProvider] Erro ao verificar autenticação:", error);
      }
  
      setAuthenticated(false);
      setUserID(null);
      setUserPlan([]);
    } finally {
      // console.log("🟡 [AuthProvider] isLoading: false");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        userId,
        setUserID,
        userPlan,
        setUserPlan,
        isLoading,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  return useContext(AuthContext);
}
