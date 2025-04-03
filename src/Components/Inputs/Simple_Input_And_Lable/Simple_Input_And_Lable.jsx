import './Simple_Input_And_Lable.scss';

const Simple_Input_And_Lable = ({ label_text, onChange, placeholder, type }) => {
  
  return (
    <div className='Simple_Input_And_Lable'>
      <label htmlFor="">{label_text}</label>
      <input 
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />
    </div>
  )
};

export default Simple_Input_And_Lable;
