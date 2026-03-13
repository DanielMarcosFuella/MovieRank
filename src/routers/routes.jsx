import { Routes, Route } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";
import { MovieDetails } from "../pages/MovieDetails";

export function MyRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/movies/:movieId" element={<MovieDetails />} />
    </Routes>
  );
}