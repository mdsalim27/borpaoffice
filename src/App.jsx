

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import ComplaintForm from "./pages/ComplaintForm.jsx";
import StatusCheck from "./pages/StatusCheck.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PrepaidMeterHelp from "./pages/PrepaidMeterHelp.jsx";
import LoadShedding from "./pages/LoadShedding.jsx";
import LoadSheddingManager from "./components/LoadSheddingManager.jsx";
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
        <Route path="/load-shedding" element={<LoadShedding />} />

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





        // আপনার Routes-এর ভেতরে:
        <Route
          path="/admin/load-shedding"
          element={<LoadSheddingManager />}
        />
      </Routes>


    </>
  );
}

export default App;