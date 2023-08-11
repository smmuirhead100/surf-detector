import SpotForecast from "./components/spotForecast";
import Home from "./components/home";
import About from "./components/about"
import Contact from "./components/contact"
import SignUp from "./components/signup";
import SignIn from "./components/signin";
import SignUpSubmitted from "./components/signupSubmitted";
import AuthRoute from "./components/AuthRoute";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/signup' element={<SignUp />}>
              <Route path='submitted' element={<SignUpSubmitted />} />
          </Route>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<Navigate to='/' replace />} />

          <Route element={<AuthRoute />}>
              {/* Specific routes */}
              <Route path='/forecast' element={<SpotForecast />} />
              {/* Catch-all route that redirects to /forecast */}
              <Route path='*' element={<Navigate to='/forecast' replace />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}
