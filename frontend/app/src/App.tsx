import SpotForecast from "./pages/spot_forecast/spotForecast";
import Home from "./pages/home/home";
import About from "./pages/about/about"
import Contact from "./components/contact"
import SignUp from "./pages/signup_signin/signup";
import SignIn from "./pages/signup_signin/signin";
import SignUpSubmitted from "./pages/signup_signin/signupSubmitted";
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
