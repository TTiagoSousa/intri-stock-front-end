const Chart_Bar = ({ GlobalColor }) => {

  return (
    <svg viewBox="0 0 16 16" fill={GlobalColor} xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier"> 
        <path d="M16 1H12V15H16V1Z" fill={GlobalColor}></path> 
        <path d="M6 5H10V15H6V5Z" fill={GlobalColor}></path> 
        <path d="M0 9H4V15H0V9Z" fill={GlobalColor}></path> 
      </g>
    </svg>
  )
}
  
export default Chart_Bar;