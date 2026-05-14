import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Chivo Pets</h2>

      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/">Salir</Link>
      </div>
    </nav>
  );
}

export default Navbar;