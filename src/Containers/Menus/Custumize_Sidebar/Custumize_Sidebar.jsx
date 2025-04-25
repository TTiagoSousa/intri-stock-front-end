import React from 'react';
import './Custumize_Sidebar.scss';
import { useNavs } from '../../../Contexts/Navs_Context';
import Dark_Div from '../../../Components/Dark_Div/Dark_Div';
import Header from './Containers/Header';

const Custumize_Sidebar = () => {

  const { customize_Sidebar, setCustomize_Sidebar, typeOfNavifation } = useNavs();  

  return (
    <>

      <Dark_Div
        toggled={setCustomize_Sidebar}
        toggle={customize_Sidebar}
      />

      <nav className={`Custumize_Sidebar ${customize_Sidebar ? 'active' : ''}`}>
        <Header />
        <div className='Settings_Container'></div>
      </nav>
    </>
  )
}

export default Custumize_Sidebar