import { useState } from "react";

import api from "../services/api";

import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";

function NewPassword() {
  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (
      newPassword !==
      confirmPassword
    ) {
      alert(
        "Las contraseñas no coinciden"
      );

      return;
    }

    try {
      await api.post(
        "/password/newPassword",
        {
          newPassword,

          confirmNewPassword:
            confirmPassword,
        }
      );

      alert(
        "Contraseña actualizada"
      );

      navigate("/")
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
        <form onSubmit={handleSubmit}>
          <h2>
            Nueva Contraseña
          </h2>

          <Input
            type="password"
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
          />

          <Input
            type="password"
            placeholder="Confirmar contraseña"
            value={
              confirmPassword
            }
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />

          <Button
            type="submit"
            text="Cambiar contraseña"
          />
        </form>
      </Card>
    </div>
  );
}

export default NewPassword;