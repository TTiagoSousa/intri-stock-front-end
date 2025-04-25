import { Route, Routes, Navigate } from 'react-router-dom';
import * as Public_Page from './Imports/public.pages';
import './App.scss';
import * as Intermediate_Page from './Imports/intermediary.pages';
import * as Private_Page from './Imports/private.pages';
import Authentication_Check from "./Authentication/Authentication_Check";
import { useAuth } from "./Contexts/Auth_Context";

function App() {

  const { authenticated } = useAuth();

  return (
    <main>
      <Routes>

        <Route index element={<Public_Page.Index />} />
        <Route path='Auth' element={ authenticated ? <Navigate to="/" /> :  <Public_Page.Auth /> } />
        <Route path="Active_Account/:token" element={ authenticated ? <Navigate to="/" /> :  <Intermediate_Page.Active_Account /> } />
        
        <Route
          path="/Main/*"
          element={
            <Authentication_Check>
                <Private_Page.Main />
            </Authentication_Check>
          }
        />
      </Routes>
    </main>
  )
};
export default App;
