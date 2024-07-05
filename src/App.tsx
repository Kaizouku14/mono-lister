import { useState } from 'react';
import './App.css'
import Button from './components/Button';

function App() {
  const [numbers, setNumbers] = useState<number[]>([]);

  const handleButtonClicked = (value : number) => {
    setNumbers([...numbers, value]);
  } 

  const isEmpty = (): boolean => numbers.length === 0;
  const handleNextButton = () => setNumbers([...numbers.slice(1)]);
  const handleClearButton = () => setNumbers([]);

  return (
    <>
      <main className='h-screen w-full flex justify-center items-center px-2' >
         <div className='h-[580px] w-[480px] py-7 px-10 flex flex-col gap-y-5 card bg-opacity-90 backdrop-filter backdrop-blur-25 backdrop-saturate-68 bg-blue-[#262626] border border-opacity-25 border-white rounded-lg'>

           <div className='flex justify-between'>
              <h1 className='text-purple-700 text-3xl font-bold'>MONO LISTER</h1>
              <button 
                className='text-red-700 font-bold border-2 border-red-700 py-1 px-4 rounded hover:bg-red-700 hover:text-white'
                onClick={handleClearButton}
                >
                Clear
              </button>
           </div>

            <div className='grid grid-cols-4 gap-3 py-1'>
               <Button values={Array.from({ length: 12 }, (_, index) => index + 1)}
                  clickButton={(value) => handleButtonClicked(value)} />
            </div>

            <button 
              className={`${isEmpty() ? 'hidden' : 'block'} cursor-pointer bg-purple-700 text-center py-2 rounded
              font-semibold hover:bg-purple-800 active:bg-purple-900 `}
              onClick={handleNextButton}
              >NEXT</button>

            <div className={`${isEmpty() ? 'hidden' : 'block'} overflow-y-auto h-50 py-4 `}>
                {numbers.length > 0 && (
                   numbers.map((data , index) => (
                    <div 
                       key={index} 
                       className='text-white py-1 flex'
                      >
                       <div>{index + 1 }. { data }</div>  
                    </div>    
                  ))
                )}
            </div>
         </div>
      </main>
    </>
  )
}

export default App
