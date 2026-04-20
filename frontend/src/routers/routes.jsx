import { Routes, Route } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";
import { MovieDetails } from "../pages/MovieDetails";
import { PersonDetails } from "../pages/PersonDetails";

export function MyRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/movies/:movieId" element={<MovieDetails />} />
      <Route path="/person/:personId" element={<PersonDetails />} />
    </Routes>
  );
}