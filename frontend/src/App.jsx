import './App.css'
import { MyRoutes } from './routers/routes'
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { Header } from "./components/Header";

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Header />
        <MyRoutes/>
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App