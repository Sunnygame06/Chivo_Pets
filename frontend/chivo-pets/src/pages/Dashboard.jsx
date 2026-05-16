import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

function Dashboard() {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const getUsers = async () => {
    try {
      const response = await api.get("/user");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const logout = () => {
    navigate("/");
  };

  const deleteUser = async (id) => {

    const confirmDelete = window.confirm(
      "¿Seguro que deseas eliminar este usuario?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/user/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const openEdit = (user) => {

    setEditingUser(user._id);

    setFormData({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      address: user.address,
    });
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateUser = async () => {

    try {

      await api.put(
        `/user/${editingUser}`,
        formData
      );

      alert("Usuario actualizado");

      setEditingUser(null);

      getUsers();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">

      <Card>

        <div className="dashboard-header">
          <h1 className="title">Dashboard</h1>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Salir
          </button>
        </div>

        <div className="table-container">

          <table className="table">

            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>

              {users.map((user) => (

                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>

                  <td>

                    <div className="actions">

                      <button
                        className="edit-btn"
                        onClick={() => openEdit(user)}
                      >
                        Editar
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteUser(user._id)}
                      >
                        Eliminar
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </Card>

      {editingUser && (

        <div className="modal">

          <div className="modal-content">

            <h2>Actualizar Usuario</h2>

            <Input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
            />

            <Input
              type="text"
              name="lastName"
              placeholder="Apellido"
              value={formData.lastName}
              onChange={handleChange}
            />

            <Input
              type="email"
              name="email"
              placeholder="Correo"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              type="text"
              name="phone"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={handleChange}
            />

            <Input
              type="text"
              name="address"
              placeholder="Dirección"
              value={formData.address}
              onChange={handleChange}
            />

            <div className="modal-buttons">

              <Button
                text="Actualizar"
                onClick={updateUser}
              />

              <button
                className="cancel-btn"
                onClick={() => setEditingUser(null)}
              >
                Cancelar
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Dashboard;
