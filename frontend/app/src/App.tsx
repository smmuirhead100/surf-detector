import SpotForecast from "./components/spotForecast"
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SpotForecast spot='huntington_beach'/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}