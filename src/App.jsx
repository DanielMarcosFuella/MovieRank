import { useState } from 'react'
import './App.css'
import { MyRoutes } from './routers/routes'
import { LanguageProvider } from "./context/LanguageContext";
import { LanguageSelector } from './components/LanguageSelector';

function App() {
  const [count, setCount] = useState(0)

  return (
        <LanguageProvider>
  <div>
    <header className='header'>
      <div className='headerLeft'>
          <LanguageSelector />
      </div> 
      <h1 className='title'>MovieRank</h1>
      <div className="headerRight"></div>
    </header>
    <MyRoutes/>
    </div>
        </LanguageProvider>
  )
}

export default App
