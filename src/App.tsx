import './App.css'
import Button from './components/Button';

function App() {

  return (
    <>
      <main className='h-screen w-full flex justify-center' >
         <div className='h-[500px] w-[480px] py-7 px-4 flex flex-col'>
            <h1 className='text-purple-700 text-3xl font-bold pl-8'>MONO LISTER</h1>

            <div className='grid grid-cols-4 mt-6 gap-3 py-1 px-8'>
               <Button values={Array.from({ length: 12 }, (_, index) => index + 1)} />
            </div>
         </div>
      </main>
    </>
  )
}

export default App
