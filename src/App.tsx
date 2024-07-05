import { useCallback, useEffect, useState } from 'react';
import './App.css'
import Button from './components/Button';
import { Toaster, toast } from 'sonner'

  // TODO: toggle theme functionality 

function App() {
  const diceNumbers: number[] = Array.from({ length: 12 }, (_, index) => index + 1);
  const [diceNumber, setDiceNumber] = useState<number[]>([]);
  const [deletedRecord, setDeletedRecord] = useState<number[]>([]);

  const handleButtonClicked = useCallback((value : number) => {
    setDiceNumber([...diceNumber, value]);

    toast.info('Diced a ' + value + '!', {
      className: 'bg-green-500 font-bold border-green-500',
      icon: '🎲',
      position: 'bottom-center',
    })
  }, [diceNumber]) 

  const isEmpty = useCallback((): boolean => diceNumber.length === 0 , [diceNumber.length]);
  const handleNextButton = useCallback(() => setDiceNumber(diceNumber.slice(1)), [diceNumber]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClearButton = useCallback(() => {
    if(!isEmpty()) {
      setDeletedRecord(diceNumber)
      setDiceNumber([]);
  
      toast('Data cleared!', {
       action: {
         label: 'Undo',
         onClick: () => setDiceNumber(deletedRecord)
       },
       position: 'bottom-center',
     })
    }
  }, [deletedRecord, diceNumber, isEmpty]) 

  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key
      
        if (/^\d$/.test(key)) {
          const value = parseInt(key, 10);
          handleButtonClicked(value)
        }else if(key === 'Enter'){
          handleNextButton()
        }else if(key === 'Backspace'){
          handleClearButton()
        }
    };

     document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [diceNumber, handleButtonClicked, handleClearButton, handleNextButton]);


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
               <Button values={diceNumbers}
                  clickButton={(value) => handleButtonClicked(value)} />
            </div>

            <button 
              className={`${isEmpty() ? 'hidden' : 'block'} cursor-pointer bg-purple-700 text-center py-2 rounded
              font-semibold hover:bg-purple-800 active:bg-purple-900 `}
              onClick={handleNextButton}
              >NEXT</button>

            <div className={`${isEmpty() ? 'hidden' : 'block'} overflow-y-auto h-50 py-4 `}>
                {diceNumber.length > 0 && (
                   diceNumber.map((data , index) => (
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
          
         
          <div className='absolute right-4 bottom-4 card bg-opacity-90 backdrop-filter backdrop-blur-25 backdrop-saturate-68 
              bg-blue-[#262626] border border-opacity-25 border-white rounded-lg p-4 flex items-center justify-between w-44
               max-md:hidden
              '>
             <button className='border-1 border-white w-[40px] h-[30px] bg-black rounded' ></button>
             <button className='border-1 border-white w-[40px] h-[30px] bg-black rounded' ></button>
             <button className='border-1 border-white w-[40px] h-[30px] bg-black rounded' ></button>
          </div>
        <Toaster toastOptions={{ duration: 1000 }}/>
      </main>
    </>
  )
}

export default App
