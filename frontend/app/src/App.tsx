import SpotForecast from "./components/spotForecast"
import Home from "./components/home"
import SignUp from "./components/signup";
import SignIn from "./components/signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/signin' element={<SignIn />}></Route>
        <Route path='forecast' element={<SpotForecast spot='huntington_beach'/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}