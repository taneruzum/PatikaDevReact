import Problem1 from './Problem1';
import ToDoApp from './Problem2';

//Ödevlerin çözümlerini çalıştırabilirsin
function App() {

  console.log("App çalıştı...");
  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-[#252525]">
      {/* <Problem1 /> */}
      <ToDoApp />

    </div>

  )
}

export default App;
