import { useState, FC, useEffect } from "react"

interface ButtonProps {
    values: number[];
    clickButton(value : number) : void; 
}

const Button: FC<ButtonProps>  = ({ values , clickButton }) => {
   const [numbers, setNumbers] = useState<number[]>([]);

   useEffect(() => {
      setNumbers(values);
   }, [values])

  const handleButtonClick = (number : number) => clickButton(number);

  return (
    <>
     {numbers.map((number, index) => (
        <button onClick={() => handleButtonClick(number)}
            key={index} 
            className='cursor-pointer text-purple-700 border-2 border-purple-700 text-center py-2 rounded hover:bg-purple-700 hover:text-[#262626] active:bg-purple-800 active:border-purple-800 font-bold'
        >
            {number}
        </button>
        ))}
    </>
  )
}

export default Button;