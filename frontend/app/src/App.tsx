import SpotForecast from "./components/spotForecast";
import Home from "./components/home";
import SignUp from "./components/signup";
import SignIn from "./components/signin";
import SignUpSubmitted from "./components/signupSubmitted";
import AuthRoute from "./components/AuthRoute";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<SignUp />}>
          <Route path='submitted' element={<SignUpSubmitted />} />
        </Route>
        <Route path='/signin' element={<SignIn />} />

        <Route element={<AuthRoute />}>
          {/* Specific routes */}
          <Route path='/forecast' element={<SpotForecast spot='huntington_beach' />} />
          {/* Catch-all route that redirects to /forecast */}
          <Route path='*' element={<Navigate to='/forecast' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
