import SpotForecast from "./components/spotForecast"
import Home from "./components/home"
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='forecast' element={<SpotForecast spot='huntington_beach'/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}