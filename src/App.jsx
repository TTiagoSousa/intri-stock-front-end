import { useState } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import * as Public_Page from './Imports/public.pages';
import './App.scss';
import * as Intermediate_Page from './Imports/intermediary.pages';

function App() {

  const [ authenticated ] = useState(false)

  return (
    <main>
      <Routes>

        <Route index element={<Public_Page.Index />} />
        <Route path='Auth' element={ authenticated ? <Navigate to="/" /> :  <Public_Page.Auth /> } />
        <Route path="Active_Account/:token" element={ authenticated ? <Navigate to="/" /> :  <Intermediate_Page.Active_Account /> } />
        
      </Routes>
    </main>
  )
};
export default App;
