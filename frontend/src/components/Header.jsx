import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LanguageSelector } from "./LanguageSelector";
import { SearchBar } from "./SearchBar";
import { Link } from "react-router-dom";
import "../components/Header.css"

export function Header() {
  const { token, logout, user } = useContext(AuthContext);

  return (
    <header className="header">

      <div className='headerLeft'>
        <LanguageSelector />
      </div> 

      <Link to="/">
        <h1 className="title">MovieRank</h1>
      </Link>

      <div className="headerRight">
        <SearchBar />
      </div>

      <div>
        {token ? (
            <div className="authButtons">
            <Link to="/profile">Mi perfil</Link>
            <button onClick={logout}>Logout</button>
      </div>
        ) : (
        <div className="authButtons">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>  
        )}
      </div>

    </header>
  );
}