import React, { useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Setting from "./pages/settings/Setting";
import Write from "./pages/Write/Write";
import Single from "./pages/single/Single";
import Home from "./pages/home/home";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { Context } from "./context/Context";
import Pagenotfound from "./pages/Notfound/Pagenotfound.js";
import Footer from "./components/footer/Footer";
import About from "./pages/About/About";

function App() {
  const { user } = useContext(Context);
  const isUserAdmin = user && user.role === 1;

  const ProtectedRoute = ({ element: Element, ...rest }) => {
    return (
      <React.Fragment>
        {isUserAdmin ? <Element {...rest} /> : <Navigate to="/" replace />}
      </React.Fragment>
    );
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/write" element={<ProtectedRoute element={Write} />} />
          <Route path="/settings" element={user ? <Setting /> : <Register />} />
          <Route path="/post/:postId" element={<Single />} />
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
