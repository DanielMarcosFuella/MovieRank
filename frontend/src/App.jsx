import { useState } from 'react'
import './App.css'
import { MyRoutes } from './routers/routes'
import { LanguageProvider } from "./context/LanguageContext";
import { LanguageSelector } from './components/LanguageSelector';
import { SearchBar } from './components/SearchBar';
import { Link } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)

  return (
        <LanguageProvider>
  <div>
    <header className='header'>
      <div className='headerLeft'>
          <LanguageSelector />
      </div> 
      <Link to="/">
        <h1 className="title">MovieRank</h1>
      </Link>
      <div className="headerRight"><SearchBar /></div>
    </header>
    <MyRoutes/>
    </div>
        </LanguageProvider>
  )
}

export default App
