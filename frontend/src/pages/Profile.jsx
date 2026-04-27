import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { get } from "../data/httpClient";
import { MovieCard } from "../components/MovieCard";
import "./Profile.css";

export function Profile() {
  const { lists, user, token } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [activeTab, setActiveTab] = useState("favorite");
  const filteredMovies = movies.filter(
  (movie) => movie.type === activeTab
  );
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editErrors, setEditErrors] = useState({});

  useEffect(() => {
    const fetchMovies = async () => {
      const enriched = await Promise.all(
        lists.map(async (item) => {
          const data = await get(`/movie/${item.movie_id}`);
          return {
            ...data,
            type: item.type,
          };
        })
      );

      setMovies(enriched);
    };

    if (lists.length > 0) {
      fetchMovies();
    }
  }, [lists]);
  const favoritesCount = lists.filter(l => l.type === "favorite").length;
  const watchedCount = lists.filter(l => l.type === "watched").length;
  const watchlistCount = lists.filter(l => l.type === "watchlist").length;
  

const validateEdit = () => {
  let errors = {};

  if (newPassword && newPassword !== confirmPassword) {
    errors.password = "Las contraseñas no coinciden";
  }

  if (newPassword && newPassword.length < 6) {
    errors.password = "Mínimo 6 caracteres";
  }

  setEditErrors(errors);

  return Object.keys(errors).length === 0;
};

const handleUpdate = async () => {
  if (!validateEdit()) return;

  try {
    const res = await fetch("http://localhost:3000/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        username: newUsername,
        currentPassword,
        password: newPassword
      })
    });

    const data = await res.json();

    if (!res.ok) {
      setEditErrors({ password: data.error });
      return;
    }

    alert("Perfil actualizado");
    setShowModal(false);

  } catch (error) {
    console.error(error);
  }
};

const handleDelete = async () => {
  const confirmDelete = window.confirm("¿Seguro que quieres eliminar tu cuenta?");

  if (!confirmDelete) return;

  try {
    await fetch("http://localhost:3000/user", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    localStorage.removeItem("token");
    window.location.href = "/";

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="profileContainer">
      <h1>{user?.username} </h1>
    <button className="editProfile" onClick={() => setShowModal(true)}>
      Editar perfil
    </button>
    <div className="tabs">
      <button
        className={activeTab === "favorite" ? "active" : ""}
        onClick={() => setActiveTab("favorite")}
      >
        ❤️ Favoritos ({favoritesCount})
      </button>

      <button
        className={activeTab === "watched" ? "active" : ""}
        onClick={() => setActiveTab("watched")}
      >
        👀 Vistas ({watchedCount})
      </button>

      <button
        className={activeTab === "watchlist" ? "active" : ""}
        onClick={() => setActiveTab("watchlist")}
      >
        📌 Pendientes ({watchlistCount})
      </button>
    </div>      
      <div className="listsGrid">
        {filteredMovies.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} />
            <span className="listTag">{movie.type}</span>
          </div>
        ))}
      </div>
          {showModal && (
      <div className="modalOverlay">
        <div className="modalContent">

          <h3>Editar perfil</h3>

          <button
            className="closeBtn"
            onClick={() => setShowModal(false)}
          >
            ✖
          </button>

          <input
            type="text"
            placeholder="Nuevo username"
            onChange={(e) => {
              setNewUsername(e.target.value);
              setEditErrors(prev => ({ ...prev, username: "" }));
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
                setEditErrors(prev => ({
                  ...prev,
                  username: "Nombre ya en uso"
                }));
              }
            }}
          />

          {editErrors.username && (
            <span className="error">{editErrors.username}</span>
          )}

          <input
            type="password"
            placeholder="Contraseña actual"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Nueva contraseña"
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirmar nueva contraseña"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {editErrors.password && (
            <span className="error">{editErrors.password}</span>
          )}

          <button onClick={handleUpdate}>
            Guardar cambios
          </button>

          <button className="deleteBtn" onClick={handleDelete}>
            Eliminar cuenta
          </button>

        </div>
      </div>
    )}
    </div>
  );
}