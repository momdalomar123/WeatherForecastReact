import "./App.css";
import {Route,Routes} from 'react-router-dom'
import WeatherScreen from "./Components/WeatherScreen";

function App() {
 
  return (
    <>
  <Routes>
    <Route path="/" element={<WeatherScreen />}/>
  </Routes>
      

    </>
  );
}

export default App;
