import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  useEffect(() => {
  const storedToken = localStorage.getItem("token");

  if (storedToken) {
    setToken(storedToken);
    fetchUser(storedToken);
    fetchLists(storedToken);    
  }
}, []);

  const login = async (newToken) => {
  localStorage.setItem("token", newToken);
  setToken(newToken);
  await fetchUser(newToken);
  await fetchLists(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const fetchLists = async (token) => {
  try {
    const response = await fetch("http://localhost:3000/lists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setLists(data);
  } catch (error) {
    console.error("Error listas:", error);
  }
};

  const fetchUser = async (token) => {
  try {
    const response = await fetch("http://localhost:3000/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
        setUser(data);
    } catch (error) {
        console.error("Error obteniendo usuario:", error);
    }
    };

  return (
    <AuthContext.Provider value={{ token, login,logout, user, lists, fetchLists }}>
      {children}
    </AuthContext.Provider>
  );
}