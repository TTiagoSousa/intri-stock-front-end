import * as Color from '../../Styles/Colors';  // Certifique-se de que o caminho está correto

// Função para obter a cor do ícone com base no tema e no estado hover
export const getIconColor = (mode, hovered) => {
    let color;
  
    if (mode === 'dark') {
      color = hovered ? Color.yellow : Color.gray;
    } else if (mode === 'light') {
      color = hovered ? Color.yellow : Color.gray_dark;
    } else {
      color = hovered ? Color.blue : Color.gray;
    }
  
    return color;
  };