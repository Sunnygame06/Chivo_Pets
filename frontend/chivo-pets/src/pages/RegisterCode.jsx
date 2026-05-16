import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import api from "../services/api";

import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";

function RegisterCode() {
  const [code, setCode] =
    useState("");

  const navigate = useNavigate();

  const verifyCode = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/register/verifyCodeEmail",
        {
          verificationCodeRequest:
            code,
        }
      );

      alert("Cuenta verificada");

      navigate("/");
    } catch (error) {
      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
          "Código incorrecto"
      );
    }
  };

  return (
    <div className="container">
      <Card>
        <form onSubmit={verifyCode}>
          <h2>
            Verificar Código
          </h2>

          <Input
            type="text"
            placeholder="Código"
            value={code}
            onChange={(e) =>
              setCode(e.target.value)
            }
          />

          <Button
            type="submit"
            text="Verificar"
          />
        </form>
      </Card>
    </div>
  );
}

export default RegisterCode;

