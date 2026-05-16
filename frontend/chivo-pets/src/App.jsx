import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterCode from "./pages/RegisterCode";
import RecoveryPassword from "./pages/RecoveryPassword";
import PasswordCode from "./pages/PasswordCode";
import NewPassword from "./pages/NewPassword";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-code" element={<RegisterCode />} />
        <Route path="/recovery" element={<RecoveryPassword />} />
        <Route path="/password-code" element={<PasswordCode />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
