import { useState } from "react";
import {
  useNavigate,
} from "react-router-dom";

import api from "../services/api";

import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState({
      name: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleRegister = async (
    e
  ) => {
    e.preventDefault();

    try {
      await api.post("/register", {
        ...form,
        isActive: true,
      });

      alert("Código enviado");

      navigate("/register-code");
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
        <form
          onSubmit={handleRegister}
        >
          <h2>Registro</h2>

          <Input
            type="text"
            name="name"
            placeholder="Nombre"
            onChange={handleChange}
          />

          <Input
            type="text"
            name="lastName"
            placeholder="Apellido"
            onChange={handleChange}
          />

          <Input
            type="email"
            name="email"
            placeholder="Correo"
            onChange={handleChange}
          />

          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
          />

          <Input
            type="text"
            name="phone"
            placeholder="Teléfono"
            onChange={handleChange}
          />

          <Input
            type="text"
            name="address"
            placeholder="Dirección"
            onChange={handleChange}
          />

          <Button
            type="submit"
            text="Registrarse"
          />
        </form>
      </Card>
    </div>
  );}

export default Register;
