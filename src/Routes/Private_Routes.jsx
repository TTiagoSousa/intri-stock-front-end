import React from 'react';
import { Route, Routes } from 'react-router-dom';
import * as Private_Page from '../Imports/private.pages';

const Private_Routes = () => {
  return (
    <>
      <Routes>
        <Route index element={ <Private_Page.Dashboard /> }/>
        <Route path='Dashboard' element={ <Private_Page.Dashboard /> }/>
        <Route path='Compound_Interest_Calculator'>
          <Route index element={ <Private_Page.Compound_Interest_Calculator /> } />
        </Route>
      </Routes>
    </>
  )
};

export default Private_Routes;