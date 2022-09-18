import React, { Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LandingPage from './views/LandingPage/LandingPage'
import LoginPage from './views/LoginPage/LoginPage'
import RegisterPage from "./views/RegisterPage/RegisterPage";
import Auth from "../hoc/auth"
import MovieDetail from "./views/MovieDetail/MovieDetail";
import Navbar from "./views/NavBar/Navbar"
import FavoritePage from "./views/FavoritePage/FavoritePage";

function App() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);
  const AuthMovieDetail = Auth(MovieDetail, null);
  const AuthFavoritePage = Auth(FavoritePage, true);

  return (
    // Routes 자식으로는 Route만 가능하고 element를 통해 컴포넌트를 줘야한다.
    <Suspense fallback={(<div>Loading...</div>)}>
      <div sytle={{ paddingTop : '69px', minHeight : 'calc(100vh - 80px)'}}>
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route exact path="/" element={<AuthLandingPage />} />
            <Route exact path="/login" element={<AuthLoginPage />} />
            <Route exact path="/register" element={<AuthRegisterPage />} />
            <Route exact path="/movie/:movieId" element={<AuthMovieDetail />} />
            <Route exact path="/favorite" element={<AuthFavoritePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Suspense>
  );
}



export default App;
