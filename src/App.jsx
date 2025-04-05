import { useState } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import * as Public_Page from './Imports/public.pages';
import './App.scss';

function App() {

  const [ authenticated ] = useState(false)

  return (
    <main>
      <Routes>

        <Route index element={<Public_Page.Index />} />
        <Route path='Auth' element={ authenticated ? <Navigate to="/" /> :  <Public_Page.Auth /> } />

      </Routes>
    </main>
  )
};
export default App;
