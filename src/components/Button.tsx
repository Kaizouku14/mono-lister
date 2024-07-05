import { useState, FC, useEffect } from "react"

interface ButtonProps {
    values: number[];
  }

const Button: FC<ButtonProps>  = ({ values }) => {
   const [numbers, setNumbers] = useState<number[]>([]);

   useEffect(() => {
      setNumbers(values);
   }, [values])

  return (
    <>
     {numbers.map((number, index) => (
        <button 
            key={index} 
            className='cursor-pointer text-purple-700 border-2 border-purple-700 text-center py-2 rounded hover:bg-purple-700 hover:text-[#262626] active:bg-purple-800 active:border-purple-800'
        >
            {number}
        </button>
        ))}
    </>
  )
}

export default Button;