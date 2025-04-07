import { useState } from 'react';
import './Simple_Input_And_Lable.scss';
import * as Color from '../../../Styles/Colors';
import * as Icon from '../../../Imports/icons';

const Simple_Input_And_Lable = ({ label_text, onChange, placeholder, type, max, ref, }) => {

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className='Simple_Input_And_Lable'>
      <label htmlFor="">{label_text}</label>
      <input 
        onChange={onChange}
        placeholder={placeholder}
        type={showPassword ? 'text' : type} 
        max={max}
        ref={ref}
      />
            {type === 'password' && (
        <div 
          className='Icon'
          onClick={toggleShowPassword}
        >
          {showPassword ? (
            <Icon.Close_Eye GlobalColor={Color.blue} />
          ) : (
            <Icon.Open_Eye GlobalColor={Color.blue} />
          )}
        </div>
      )}
    </div>
  )
};

export default Simple_Input_And_Lable;
