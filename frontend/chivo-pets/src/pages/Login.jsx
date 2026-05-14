import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import api from "../services/api";

import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await api.post("/login", {
        email,
        password,
      });

      alert("Login exitoso");

      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
          "Credenciales incorrectas"
      );
    }
  };

  return (
    <div className="container">
      <Card>
        <form onSubmit={handleLogin}>
          <h2>Iniciar Sesión</h2>

          <Input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <Button
            type="submit"
            text="Ingresar"
          />

          <div className="links">
            <Link to="/register">
              Crear cuenta
            </Link>

            <Link to="/recovery">
              Recuperar contraseña
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Login;