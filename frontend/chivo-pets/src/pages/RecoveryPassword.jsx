import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import api from "../services/api";

import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";

function RecoveryPassword() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const handleRecovery = async (
    e
  ) => {
    e.preventDefault();

    try {
      await api.post(
        "/password/email",
        {
          email,
        }
      );

      alert("Código enviado");

      navigate("/password-code");
    } catch (error) {
      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
          "Error"
      );
    }
  };

  return (
    <div className="container">
      <Card>
        <form onSubmit={handleRecovery}>
          <h2>
            Recuperar contraseña
          </h2>

          <Input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            } />

          <Button
            type="submit"
            text="Enviar código"
          />
        </form>
      </Card>
    </div>
  );
}

export default RecoveryPassword;

