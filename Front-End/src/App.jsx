import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./UserProvider";
import LoginPage from "./pages/LoginPage.jsx";
import Menu from "./pages/admin/Menu.jsx";
import Inventory from "./pages/admin/Inventory.jsx";
import RegisterProduct from "./pages/admin/RegisterProduct.jsx";
import Sales from "./pages/admin/Sales.jsx";
import Reports from "./pages/admin/Reports.jsx";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/reports" element={<Reports />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/register" element={<RegisterProduct />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
