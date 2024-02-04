import SaveButton from './components/SaveBtn';
import Editor from './components/Editor';
function App() {
  
  return (
    <div className="flex flex-col items-center px-14 font-comic">
      <div className='flex justify-between items-center w-full px-4 pb-2 pt-8 lg:pl-[40%]'>
        <div className='text-2xl font-bold'>demo editor by Shyan</div>
        <div className='border-4 border-black'><SaveButton /></div>
      </div>
      <div className='p-4 w-full border-4 border-[#97bdf2] h-full'>
        <Editor />
      </div>
    </div>
    
  )
}

export default App

