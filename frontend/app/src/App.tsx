import SpotForecast from "./components/spotForecast"
import Home from "./components/home"
import SignUp from "./components/signup";
import SignIn from "./components/signin";
import SignUpSubmitted from "./components/signupSubmitted"
import AuthRoute from "./components/AuthRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/signup/submitted/' element={<SignUpSubmitted />}></Route>
        <Route path='/signin' element={<SignIn />}></Route>
        <Route element={<AuthRoute />}>
          <Route path='/' element={<SpotForecast spot='malibu' />}></Route>
          <Route path='/forecast' element={<SpotForecast spot='huntington_beach'/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}