import Problem1 from './Problem1';
import ToDoApp from './Problem2';
import WeatherApp from './Problem3';
import { WeatherProvider } from './Problem3/WeatherContext';


//Ödevlerin çözümlerini çalıştırabilirsin
function App() {

  console.log("App çalıştı...");
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center bg-[#252525]">
      {/* <Problem1 /> */}
      {/* <ToDoApp /> */}

      <WeatherProvider>
        <WeatherApp />
      </WeatherProvider>
    </div>
  )
}

export default App;
