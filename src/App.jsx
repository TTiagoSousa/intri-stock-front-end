import { useState } from "react";
import { Route, Routes } from "react-router";
import * as Public_Page from './Imports/public.pages';
import './App.scss';

function App() {

  const [ authenticated ] = useState(true)

  return (
    <main>
      <Routes>

        <Route index element={<Public_Page.Index />} />

      </Routes>
    </main>
  )
};
export default App;
