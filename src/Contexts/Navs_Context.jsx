import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {

  // Alert  
    const [ alert, setAlert ] = useState({
      open: false, // Alert Close
      message: "", // Alert message
      type: "", // type of alert
    })
  // Alert

  return (
    <NavigationContext.Provider
      value={{
        alert, setAlert,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

NavigationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useNavs() {
  return useContext(NavigationContext);
}
