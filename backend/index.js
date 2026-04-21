import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authMiddleware } from "./middleware/auth.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/test", (req, res) => {
  res.json({ message: "Backend funcionando 🚀" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en DB");
  }
});


app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );  

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en login" });
  }
});

app.get("/me", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, username, email FROM users WHERE id = $1",
      [req.user.userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo usuario" });
  }
});

app.post("/lists", authMiddleware, async (req, res) => {
  const { movieId, type } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO user_movies (user_id, movie_id, type) VALUES ($1, $2, $3) RETURNING *",
      [req.user.userId, movieId, type]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error añadiendo película" });
  }
});

app.get("/lists", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM user_movies WHERE user_id = $1",
      [req.user.userId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo listas" });
  }
});

app.delete("/lists", authMiddleware, async (req, res) => {
  const { movieId, type } = req.body;

  try {
    await pool.query(
      "DELETE FROM user_movies WHERE user_id = $1 AND movie_id = $2 AND type = $3",
      [req.user.userId, movieId, type]
    );

    res.json({ message: "Eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando película" });
  }
});

app.post("/check-email", async (req, res) => {
  const { email } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (result.rows.length > 0) {
    return res.json({ exists: true });
  }

  res.json({ exists: false });
});

app.post("/check-username", async (req, res) => {
  const { username } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );

  if (result.rows.length > 0) {
    return res.json({ exists: true });
  }

  res.json({ exists: false });
});