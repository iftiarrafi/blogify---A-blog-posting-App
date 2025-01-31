import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import About from "./pages/About.jsx";

import Protected from "./components/Protected.jsx";
import Register from "./pages/Register.jsx";
import OthersProfile from "./pages/OthersProfile.jsx";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />

        <Route path="/auth" element={<Protected />}>
          <Route path="profile" element={<Profile />} />
          <Route path="other/:id" element={<OthersProfile />} />
        </Route>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
