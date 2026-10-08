

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import ComplaintForm from "./pages/ComplaintForm.jsx";
import StatusCheck from "./pages/StatusCheck.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PrepaidMeterHelp from "./pages/PrepaidMeterHelp.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />

        <Route
          path="/complaint"
          element={<ComplaintForm />}
        />
        <Route path="/prepaid-help" element={<PrepaidMeterHelp />} />

        <Route
          path="/status"
          element={<StatusCheck />}
        />

        <Route path="/admin/login" element={<AdminLogin />} />




        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/admin"
            element={<AdminDashboard />}
          />
        </Route>
      </Routes>
      {/* <PrepaidMeterHelp /> */}
    </>
  );
}

export default App;