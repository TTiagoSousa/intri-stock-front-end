import React, { useState, useEffect, useRef } from 'react';
import './Simple_Selector_And_Lable.scss';

const Simple_Selector_And_Lable = ({ label_text, options, value, onChange }) => {
  const [open, setOpen] = useState(false); // Estado para controlar a visibilidade da lista
  const selectorRef = useRef(null); // Referência para o componente do seletor
  const selectedOption = options.find(option => option.value === value);
  // Função para abrir ou fechar a lista quando o input for clicado
  const handleInputClick = () => {
    setOpen(!open); // Alterna a visibilidade da lista
  };

  // Função para fechar a lista quando clicar fora do seletor
  const handleClickOutside = (event) => {
    if (selectorRef.current && !selectorRef.current.contains(event.target)) {
      setOpen(false); // Fecha a lista se o clique for fora do componente
    }
  };

  // Adiciona o event listener para detectar cliques fora
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    onChange(option.value); // Passa o valor da opção selecionada
    setOpen(false); // Fecha a lista
  };

  return (
    <div className='Simple_Selector_And_Lable' ref={selectorRef}>
      <label htmlFor="">{label_text}</label>
      <input 
        type="text" 
        value={selectedOption ? selectedOption.label : ''}
        onClick={handleInputClick} 
        readOnly 
      />
      {open && (
        <div className='Dropdown'>
          <ul>
            {options.map((option, index) => (
              <li key={index} onClick={() => handleOptionClick(option)}>
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Simple_Selector_And_Lable;