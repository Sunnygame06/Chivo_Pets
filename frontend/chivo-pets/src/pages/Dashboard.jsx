import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="dashboard">
        <div className="card">
          <h2>Bienvenido</h2>

          <p>
            Sistema Chivo Pets
          </p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;