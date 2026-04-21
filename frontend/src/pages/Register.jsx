import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export function Register() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
  email: "",
  username: "",
  password: ""
  });


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setErrors({
        email: "",
        username: "",
        password: "Error al registrar usuario"
      });
      return;
    }

    navigate("/login");

  } catch (error) {
    console.error(error);
  }
};

  const validate = () => {
  let newErrors = {};

  if (!email.includes("@")) {
    newErrors.email = "Email inválido";
  }

  if (username.length < 3) {
    newErrors.username = "Mínimo 3 caracteres";
  }

  if (password.length < 6) {
    newErrors.password = "Mínimo 6 caracteres";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="authContainer">
    <form className="authForm" onSubmit={handleSubmit}>
        <h2>Crear cuenta</h2>
<input
  type="text"
  placeholder="Username"
  onChange={(e) => {
    setUsername(e.target.value);
    setErrors(prev => ({ ...prev, username: "" }));
  }}
    onBlur={async (e) => {
      const value = e.target.value;

      if (!value) return;

      const res = await fetch("http://localhost:3000/check-username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: value })
      });

      const data = await res.json();

      if (data.exists) {
        setErrors(prev => ({
          ...prev,
          username: "Nombre ya en uso"
        }));
      }
    }}
/>
{errors.username && <span className="error">{errors.username}</span>}

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors(prev => ({ ...prev, email: "" }));
        }}
      onBlur={async (e) => {
        const value = e.target.value;

        if (!value) return;

        const res = await fetch("http://localhost:3000/check-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email: value })
        });

        const data = await res.json();

        if (data.exists) {
          setErrors(prev => ({
            ...prev,
            email: "Email ya registrado"
          }));
        }
      }}
      />
{errors.email && <span className="error">{errors.email}</span>}
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <span className="error">{errors.password}</span>}

      <button type="submit">Register</button>
      <p className="authLink">
      ¿Ya tienes cuenta? <a href="/login">Login</a>
      </p>
    </form>
    </div>
  );
}